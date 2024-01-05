import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Container,
  AppBar,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  ListItem,
  ListItemText,
  capitalize,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { CURRENCY, LOGO, MENUS } from "../constants/constants";
import { User } from "../model";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { getUserData } from "../service";
import { AccountCircle, Logout } from "@mui/icons-material";

type ContextType = { user: User; setUser: (value: User) => void };

export function Layout() {
  const navigator = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    const getData = async () => {
      const data = await getUserData();
      if (data !== undefined) {
        setUser(data);
      } else {
        navigator("/log-in");
      }
    };
    getData();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {LOGO}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {MENUS[user.role].map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={handleCloseNavMenu}
                    href={menu.href}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {LOGO}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {MENUS[user.role].map((menu) => (
                <Button
                  key={menu.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                  href={menu.href}
                  size="small"
                >
                  {menu.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Kullanıcı Bilgileri">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle
                    sx={{ fontSize: "2.5rem", color: "primary.contrastText" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <ListItem key="user-info" sx={{ textAlign: "center" }}>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={capitalize(user.role)}
                    primaryTypographyProps={{ fontSize: "1.2rem" }}
                    secondaryTypographyProps={{ fontSize: "1rem" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`${user.balance} ${CURRENCY}`}
                    secondary="Balance"
                    sx={{ display: "flex", flexDirection: "column-reverse" }}
                  />
                </ListItem>
                <Divider />
                <MenuItem
                  key={"logout"}
                  onClick={() => {
                    handleCloseUserMenu();
                    navigator("/log-in");
                  }}
                  sx={{ marginTop: "0.5rem" }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>Çıkış Yap</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet context={{ user, setUser }} />
      </Container>
    </Box>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}
