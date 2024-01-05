import { Radio, Typography, CardContent, Card, Box } from "@mui/material";
import { Role } from "../../model";
import { CLIENT, FREELANCER } from "../../constants/constants";

interface IProp {
  role: Role;
}

export function RoleCard({ role }: IProp) {
  const texts = role === "freelancer" ? FREELANCER : CLIENT;
  return (
    <Card sx={{ width: 275, margin: "1rem", height: 200}} variant="outlined">
      <CardContent sx={{display: "flex", flexDirection: "column"}}>
        <Box display={"flex"} alignItems={"center"}>
          {texts.icon}
          <Radio value={texts.value} />
        </Box>
        <Typography variant="h5" component="div">
          {texts.header}
        </Typography>
        <Typography variant="h6" component="div">
          {texts.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
