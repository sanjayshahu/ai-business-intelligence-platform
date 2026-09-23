// // components/MaterialUIComponent.tsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Switch,
//   FormControlLabel,
//   TextField,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Chip,
//   Grid,
//   Paper,
//   Slider,
//   Fab,
// } from '@mui/material';
// import {
//   Notifications as NotificationsIcon,
//   Favorite as FavoriteIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';

// const MaterialUIComponent: React.FC = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [sliderValue, setSliderValue] = useState(30);
//   const [liked, setLiked] = useState(false);

//   return (
//     <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
//       {/* App Bar */}
//       <AppBar position="static" elevation={2}>
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Material UI Demo
//           </Typography>
//           <IconButton color="inherit">
//             <Badge badgeContent={4} color="secondary">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//           <IconButton color="inherit">
//             <Badge badgeContent={17} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header */}
//         <Paper elevation={2} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
//           <Typography variant="h3" component="h1" gutterBottom color="primary">
//             Material Design System
//           </Typography>
//           <Typography variant="h6" color="text.secondary" paragraph>
//             Google's Material Design components with built-in accessibility
//           </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Chip label="Components" color="primary" variant="outlined" />
//             <Chip label="Theming" color="secondary" variant="outlined" />
//             <Chip label="Icons" color="success" variant="outlined" />
//             <Chip label="Accessible" color="info" variant="outlined" />
//           </Box>
//         </Paper>

//         <Grid container spacing={4}>
//           {/* Card 1 */}
//           <Grid item xs={12} md={4}>
//             <Card elevation={3} sx={{ height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                   Interactive Controls
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   Material UI provides rich interactive components with smooth animations.
//                 </Typography>
                
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={darkMode}
//                       onChange={(e) => setDarkMode(e.target.checked)}
//                       color="primary"
//                     />
//                   }
//                   label="Dark Mode"
//                 />
                
//                 <Box sx={{ mt: 2 }}>
//                   <Typography gutterBottom>Slider Value: {sliderValue}</Typography>
//                   <Slider
//                     value={sliderValue}
//                     onChange={(_, value) => setSliderValue(value as number)}
//                     aria-labelledby="continuous-slider"
//                     color="secondary"
//                   />
//                 </Box>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary">
//                   Learn More
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           {/* Card 2 */}
//           <Grid item xs={12} md={4}>
//             <Card elevation={3} sx={{ height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                   Icon Buttons
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   Beautiful icon buttons with different variants and states.
//                 </Typography>
                
//                 <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                   <IconButton 
//                     color={liked ? 'error' : 'default'}
//                     onClick={() => setLiked(!liked)}
//                   >
//                     <FavoriteIcon />
//                   </IconButton>
                  
//                   <Button variant="contained" startIcon={<ShoppingCartIcon />}>
//                     Add to Cart
//                   </Button>
                  
//                   <Button variant="outlined" color="success">
//                     Success
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Card 3 */}
//           <Grid item xs={12} md={4}>
//             <Card elevation={3} sx={{ height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                   Form Elements
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   Comprehensive form controls with validation states.
//                 </Typography>
                
//                 <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                   <TextField
//                     label="Email Address"
//                     type="email"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                   />
//                   <TextField
//                     label="Message"
//                     multiline
//                     rows={3}
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                   />
//                   <Button variant="contained" color="primary">
//                     Submit
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Floating Action Button */}
//         <Fab 
//           color="primary" 
//           aria-label="add"
//           sx={{ position: 'fixed', bottom: 16, right: 16 }}
//         >
//           <AddIcon />
//         </Fab>
//       </Container>
//     </Box>
//   );
// };

// export default MaterialUIComponent;
export default {}