import { Box, Container, Pagination, Typography } from "@mui/material";
import { IWork } from "../../model";
import { useEffect, useState } from "react";
import { WorkCard } from "../../feature";
import { getWorksCount, getWorksData } from "../../service/Post";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../layout";
import { TITLE } from "../../constants/constants";

export function ListOpenWorkPage() {
  const [workList, setWorkList] = useState<IWork[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const { user } = useUser();
  const navigation = useNavigate();

  useEffect(() => {
    if (user.userId !== "" && user.role !== "freelancer") {
      navigation("/log-in");
    }
  }, [user]);

  useEffect(() => {
    const getWorkList = async () => {
      setWorkList(await getWorksData(currentPage));
    };
    getWorkList();
  }, [currentPage]);

  useEffect(() => {
    const getCount = async () => {
      setCount(await getWorksCount());
    };
    getCount();
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
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          width: {
            xs: 300,
            sm: 400,
            md: 500,
            lg: 600,
            xl: 700,
          },
        }}
      >
        {TITLE.OPENWORK}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {workList !== undefined
          ? workList.map((work) => {
              return (
                <WorkCard
                  work={work}
                  key={work.workId}
                  disabled={user.availableWorks.includes(work.workId)}
                />
              );
            })
          : ""}
      </Box>
      <Pagination
        count={Math.ceil(count / 10)}
        color="primary"
        sx={{ margin: "2rem 0" }}
        onChange={handleChange}
        page={currentPage}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}

export default ListOpenWorkPage;
