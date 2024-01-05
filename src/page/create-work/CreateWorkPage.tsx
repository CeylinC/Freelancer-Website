import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { BUTTON, CURRENCY, PROJECT, TITLE } from "../../constants/constants";
import { IWork, Work } from "../../model";
import { createWork, setAvailableWork } from "../../service/Post";
import { useUser } from "../../layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { dateControl } from "../../util/dateControl";

export function CreateWorkPage() {
  const { user, setUser } = useUser();
  const navigation = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user.userId !== "" && user.role !== "client") {
      navigation("/log-in");
    }
  }, [user]);

  const addAvailableWork = async (work: IWork) => {
    const workID = await createWork(work);
    setAvailableWork(user.userId, [...user.availableWorks, workID]);
    setUser({ ...user, availableWorks: [...user.availableWorks, workID] });
  };

  const dataUndefinedControl = (data: any) => {
    if (
      data.get("name") !== "" &&
      data.get("amount") !== "" &&
      data.get("finish") !== "" &&
      data.get("start") !== "" &&
      data.get("description") !== ""
    ) {
      return false;
    } else if (parseInt(data.get("amount")) < 0) {
      alert("Negatif Ücret olmaz");
      return true;
    } 
    else if(dateControl(data.get("start"), data.get("finish"))){
      alert("Geçerli tarih gir");
      return true;
    }
    else {
      alert("Doldur o boşlukları");
      return true;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (dataUndefinedControl(data)) {
      return;
    } else {
      const work: IWork = new Work({
        name: data.get("name"),
        description: data.get("description"),
        amount: data.get("amount"),
        start: data.get("start"),
        finish: data.get("finish"),
      });
      addAvailableWork(work);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2" marginRight="5rem" textAlign="end">
            {TITLE.WORK}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={PROJECT.NAME}
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label={PROJECT.DESC}
              type="text"
              id="description"
              multiline
              maxRows={5}
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="outlined-adornment-amount">
                {PROJECT.AMOUNT}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">{CURRENCY}</InputAdornment>
                }
                label={PROJECT.AMOUNT}
                type="number"
                name="amount"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ mt: 2, mb: 1 }}
                      label={PROJECT.START}
                      name="start"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ mt: 2, mb: 1 }}
                      label={PROJECT.FINISH}
                      name="finish"
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {BUTTON.CREATE}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
