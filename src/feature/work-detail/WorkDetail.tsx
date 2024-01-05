import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import useScreenSize from "../../hook/useScreenSize";
import { useEffect, useState } from "react";
import { Role, IWork, Freelancer } from "../../model";
import { BUTTON, PROJECT } from "../../constants/constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { dateControl } from "../../util/dateControl";

interface IProp {
  workInfo: IWork;
  role: Role;
  setWorkInfo: (value: IWork) => void;
  userId?: string;
}

export function WorkDetail({ workInfo, role, setWorkInfo, userId }: IProp) {
  const screenSize = useScreenSize();
  const [isChangeDetails, setChangeDetails] = useState<boolean>(false);
  const [work, setWork] = useState(workInfo);
  const [valueStart, setValueStart] = useState<Dayjs | null>(
    dayjs(workInfo.start)
  );
  const [valueFinish, setValueFinish] = useState<Dayjs | null>(
    dayjs(workInfo.finish)
  );

  useEffect(() => {
    if (valueStart !== null && valueFinish !== null) {
      setWork({
        ...work,
        start: `${valueStart.get("month") + 1}/${valueStart.get(
          "date"
        )}/${valueStart.get("year")}`,
        finish: `${valueFinish.get("month") + 1}/${valueFinish.get(
          "date"
        )}/${valueFinish.get("year")}`,
      });
    }
  }, [valueStart, valueFinish]);

  const handleClick = () => {
    if (isChangeDetails) {
      if (work.name !== "" && work.description !== "" && work.amount !== "") {
        if (parseInt(work.amount) < 0) {
          alert("Negatif Ücret olamaz");
        } else if (dateControl(work.start, work.finish)) {
          alert("Geçerli Tarih gir");
          return;
        } else {
          setWorkInfo(work);
        }
      } else {
        alert("Boşlukları doldur!");
      }
    }
    setChangeDetails(!isChangeDetails);
  };

  const userControl = () => {
    if (userId !== undefined) {
      return userId === work.freelancer?.id;
    }
    return false;
  };

  return (
    <Box component={"form"} width={"100%"}>
      <Box
        sx={{
          marginTop: "2rem",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginRight: {
              xs: "0rem",
              sm: "2rem",
            },
          }}
        >
          {PROJECT.DETAILS}
        </Typography>
        {role === "client" ? (
          <ButtonGroup
            disabled={workInfo.state === 3 || workInfo.state === 4}
            variant="outlined"
            aria-label="outlined button group"
            orientation={screenSize.width < 600 ? "vertical" : "horizontal"}
            size="small"
            sx={{
              marginTop: {
                xs: "1rem",
                sm: "0",
                md: "0",
              },
              maxWidth: 400,
            }}
          >
            <Button onClick={handleClick}>
              {isChangeDetails ? BUTTON.CLIENT.SAVE : BUTTON.CLIENT.CHANGE}
            </Button>
            <Button
              onClick={() => {
                setWorkInfo({
                  ...workInfo,
                  state: 1,
                  freelancer: new Freelancer(),
                });
              }}
              disabled={workInfo.freelancer?.id === ""}
            >
              {BUTTON.CLIENT.DELETE}
            </Button>
            <Button
              onClick={() =>
                setWorkInfo({ ...workInfo, isActive: !workInfo.isActive })
              }
            >
              {workInfo.isActive ? BUTTON.CLIENT.CLOSE : BUTTON.CLIENT.OPEN}
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            onClick={() =>
              setWorkInfo({
                ...workInfo,
                state: 1,
                freelancer: new Freelancer(),
              })
            }
            disabled={
              workInfo.freelancer?.id === "" ||
              workInfo.state === 3 ||
              workInfo.state === 4 ||
              userControl()
            }
            variant="outlined"
          >
            {BUTTON.FREELANCER.LEAVE}
          </Button>
        )}
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemText
            secondary={isChangeDetails ? "" : PROJECT.NAME}
            primary={
              isChangeDetails ? (
                <TextField
                  id="project-name"
                  label={PROJECT.NAME}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={work.name}
                  onChange={(event) =>
                    setWork({ ...work, name: event.target.value })
                  }
                />
              ) : (
                workInfo.name
              )
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            secondary={isChangeDetails ? "" : PROJECT.DESC}
            primary={
              isChangeDetails ? (
                <TextField
                  id="project-description"
                  label={PROJECT.DESC}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={work.description}
                  onChange={(event) =>
                    setWork({
                      ...work,
                      description: event.target.value,
                    })
                  }
                />
              ) : (
                workInfo.description
              )
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            secondary={isChangeDetails ? "" : PROJECT.AMOUNT}
            primary={
              isChangeDetails ? (
                <TextField
                  id="project-amount"
                  label={PROJECT.AMOUNT}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={work.amount}
                  onChange={(event) =>
                    setWork({
                      ...work,
                      amount: event.target.value,
                    })
                  }
                />
              ) : (
                workInfo.amount
              )
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            secondary={isChangeDetails ? "" : PROJECT.START}
            primary={
              isChangeDetails ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ mt: 2, mb: 1 }}
                    label={PROJECT.START}
                    name="start"
                    value={valueStart}
                    onChange={(value) => setValueStart(value)}
                  />
                </LocalizationProvider>
              ) : (
                workInfo.start
              )
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            secondary={isChangeDetails ? "" : PROJECT.FINISH}
            primary={
              isChangeDetails ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ mt: 2, mb: 1 }}
                    label={PROJECT.FINISH}
                    name="finish"
                    value={valueFinish}
                    onChange={(value) => setValueFinish(value)}
                  />
                </LocalizationProvider>
              ) : (
                workInfo.finish
              )
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            secondary={PROJECT.FREELANCER}
            primary={
              workInfo.freelancer !== undefined
                ? `${workInfo.freelancer?.firstName} ${workInfo.freelancer?.lastName} - ${workInfo.freelancer?.email}`
                : "none"
            }
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          />
        </ListItem>
      </List>
    </Box>
  );
}
