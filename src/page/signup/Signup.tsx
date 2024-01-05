import {
  FormControl,
  RadioGroup,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Divider,
} from "@mui/material";
import { RoleCard } from "../../feature";
import { IUser, User } from "../../model";
import { BUTTON, LINK, TITLE, USER } from "../../constants/constants";
import { Copyright } from "../../component";
import { createUser } from "../../service";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  const dataUndefinedControl = (data: any) => {
    if (
      data.get("password") !== "" &&
      data.get("firstName") !== "" &&
      data.get("lastName") !== "" &&
      data.get("email") !== "" &&
      data.get("location") !== ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (dataUndefinedControl(data)) {
      alert("Doldurun Boşlukları!");
    } else {
      const password = data.get("password")?.toString();
      const user: IUser = new User({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        role: data.get("role"),
        email: data.get("email"),
        location: data.get("location"),
      });
      if (password !== undefined) {
        createUser(user, password, navigate);
      }
    }
  };

  return (
    <>
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: {
                sx: "column",
                sm: "row",
              },
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              marginRight="5rem"
              textAlign="end"
            >
              {TITLE.SIGNUP}
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit}
            >
              <RadioGroup
                defaultValue="client"
                name="role"
                sx={{
                  display: "flex",
                  flexDirection: { sx: "column", md: "row" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RoleCard role="freelancer" />
                <RoleCard role="client" />
              </RadioGroup>
              <Divider sx={{marginTop: "0.5rem", marginBottom: "1rem"}}/>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label={USER.NAME}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label={USER.SURNAME}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label={USER.EMAIL}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={USER.PASSWORD}
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="location"
                    label={USER.LOCATION}
                    type="text"
                    id="location"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {BUTTON.SIGNUP}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/log-in" variant="body2">
                    {LINK.LOGIN}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
    </>
  );
}
