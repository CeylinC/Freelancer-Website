import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { IWork } from "../../model";
import { useEffect, useState } from "react";
import React from "react";
import { CURRENCY, TITLE } from "../../constants/constants";
import { useSearchParams } from "react-router-dom";
import { getAvailableWorkDatas } from "../../service/Post";
import { useUser } from "../../layout";

export function ListAvailableWorkPage() {
  const [workList, setWorkList] = useState<IWork[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();

  useEffect(() => {
    const getWorkList = async () => {
      setWorkList(
        await getAvailableWorkDatas(user.availableWorks, currentPage)
      );
    };
    getWorkList();
  }, [currentPage, user.availableWorks]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam !== null) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setSearchParams({ page: "1" });
    }
  }, [setSearchParams, searchParams]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setSearchParams({ page: value.toString() });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h4" width={"100%"}>
        {TITLE.AVAILABLEWORK}
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {workList !== undefined
          ? workList.map((work, index) => {
              return (
                <Link
                  underline="none"
                  href={`/work?id=${work.workId}`}
                  key={index}
                >
                  <ListItem>
                    <ListItemAvatar
                      sx={{ color: "primary.dark", fontSize: "3rem" }}
                    >
                      {index + 1 + 10 * (currentPage - 1)}.
                    </ListItemAvatar>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <ListItemText
                        primary={work.name}
                        secondary={work.description}
                        secondaryTypographyProps={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      />
                      <ListItemText sx={{textAlign: "end"}}
                      secondaryTypographyProps={{color: "primary.light"}}
                        primary={`${work.amount} ${CURRENCY}`}
                        secondary={<React.Fragment>
                          <Typography variant="body2">
                            {work.start} Başlangıç
                          </Typography>
                          <Typography variant="body2">
                            {work.finish} Bitiş
                          </Typography>
                        </React.Fragment>}
                      />
                    </Box>
                  </ListItem>
                  <Divider variant="fullWidth" component="li" />
                </Link>
              );
            })
          : ""}
      </List>
      <Pagination
        count={Math.ceil(user.availableWorks.length / 10)}
        color="primary"
        sx={{ margin: "2rem 0" }}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}

export default ListAvailableWorkPage;
