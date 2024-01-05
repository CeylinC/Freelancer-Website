import {
  Backdrop,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Freelancer, IFreelancer, IWork, Work } from "../../model";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { WorkDetail } from "../../feature";
import { ProgressiveBar } from "../../component";
import { BUTTON, TAB } from "../../constants/constants";
import { useUser } from "../../layout";
import {
  getFreelancerListData,
  getWorkData,
  payMoney,
  updateWorkData,
} from "../../service/Post";
import { useSearchParams } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function DisplayWorkPage() {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const { user } = useUser();
  const [work, setWork] = useState<IWork>(new Work());
  const [freelancerList, setFreelancerList] = useState<IFreelancer[]>([
    new Freelancer(),
  ]);
  const [firstData, setFirstData] = useState(true);

  useEffect(() => {
    const getWork = async () => {
      const workParam = searchParams.get("id");
      if (workParam !== null) {
        const work = await getWorkData(workParam);
        if (work !== undefined) {
          setWork(work);
        }
      }
    };
    getWork();
  }, [searchParams]);

  useEffect(() => {
    const getFreelancerList = async () => {
      setFreelancerList(await getFreelancerListData(work.workId));
    };
    if (value === 1) {
      getFreelancerList();
    }
  }, [value]);

  useEffect(() => {
    if (!firstData) {
      updateWorkData(work);
    } else if (work.workId !== "") {
      setFirstData(!firstData);
    }
  }, [work, setWork]);

  return (
    <Box sx={{ width: "100%", marginBottom: "2rem" }}>
      <Typography variant="h4" sx={{ margin: "1rem 2rem" }}>
        {work.name}
      </Typography>
      {user.role === "client" ? (
        <>
          <Box>
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
              }}
              elevation={24}
            >
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                {TAB.map((menu, index) => {
                  return (
                    <BottomNavigationAction
                      label={menu.title}
                      key={index}
                      icon={menu.icon}
                    />
                  );
                })}
              </BottomNavigation>
            </Paper>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                padding: "1rem 2rem",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%"
              }}
            >
              <ProgressiveBar
                activeStep={work.state}
                isActive={work.isActive !== undefined ? work.isActive : false}
              />
              <Box>
                <WorkDetail
                  workInfo={work}
                  role={user.role}
                  setWorkInfo={setWork}
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={work.state !== 3}
                  onClick={() => {
                    setWork({ ...work, state: 4 });
                    payMoney(work.freelancer?.id, user, parseInt(work.amount));
                  }}
                  sx={{ boxShadow: "none" }}
                >
                  {BUTTON.CLIENT.CONFIRM}
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {freelancerList !== undefined
                  ? freelancerList.map((freelancer) => {
                      if (freelancer.id !== undefined) {
                        return (
                          <ListItem
                            key={`${freelancer.id}`}
                            secondaryAction={
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  setWork({
                                    ...work,
                                    freelancer: freelancer,
                                    state: 2,
                                  });
                                  setValue(0);
                                }}
                              >
                                {BUTTON.CLIENT.SELECT}
                              </Button>
                            }
                            disablePadding
                          >
                            <ListItemButton>
                              <ListItemAvatar>
                                <AccountCircleIcon
                                  sx={{ fontSize: "2.75rem" }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                id={`${freelancer.id}`}
                                primary={`${freelancer.firstName} ${freelancer.lastName}`}
                                secondary={freelancer.email}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      }
                      return "Sorry, no Freelancers";
                    })
                  : "none"}
              </List>
            </Box>
          </TabPanel>
        </>
      ) : (
        <Box
          sx={{
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <ProgressiveBar
            activeStep={work.state}
            isActive={work.isActive !== undefined ? work.isActive : false}
          />
          <Box>
            <WorkDetail
              workInfo={work}
              role={user.role}
              setWorkInfo={setWork}
            />
            <Button
              variant="contained"
              fullWidth
              disabled={work.state !== 2 || user.userId !== work.freelancer?.id}
              onClick={() => setWork({ ...work, state: 3 })}
              sx={{ boxShadow: "none" }}
            >
              {BUTTON.FREELANCER.COMPLETE}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default DisplayWorkPage;
