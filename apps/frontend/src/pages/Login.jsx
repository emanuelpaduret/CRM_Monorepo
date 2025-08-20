import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Stack,
  Sheet,
} from '@mui/joy';
import { auth, setTempToken } from '../services/api';

/**
 * Login page component.
 *
 * Renders a simple login form that posts credentials to the backend. On a
 * successful response the authentication token and user information are stored
 * in localStorage only when the user opts to be remembered; otherwise the token
 * is kept in memory for the session and cleared on logout. The parent callback
 * is notified so the rest of the app can update accordingly.
 */

// Array of your current space image filenames
const spaceImages = [
  '2025-06-30 - NGC 4651 The Umbrella Galaxy.png',
  '2025-07-01 - Eye Sky a Dragon.jpg',
  '2025-07-02 - Milky Way Through Otago Spires.jpg',
  '2025-07-03 - Nova V462 Lupi Now Visible.jpg',
  '2025-07-04 - NGC 6946 and NGC 6939.jpg',
  '2025-07-05 - Ou4 The Giant Squid Nebula.jpg',
  '2025-07-08 - The Pleiades in Red and Blue.jpg',
  '2025-07-09 - A Beautiful Trifid.jpg',
  '2025-07-10 - Lynds Dark Nebula 1251.jpg',
  '2025-07-11 - The Veins of Heaven.jpg',
  '2025-07-12 - Clouds and the Golden Moon.jpg',
  '2025-07-13 - Planetary Nebula Mz3 The Ant Nebula.jpg',
  '2025-07-14 - NGC 2685 The Helix Galaxy.jpg',
  '2025-07-15 - Collapse in Hebes Chasma on Mars.jpg',
  '2025-07-16 - The Rosette Nebula from DECam.jpg',
  '2025-07-19 - Messier 6.jpg',
  '2025-07-20 - Lunar Nearside.jpg',
  '2025-07-21 - Cat\'s Paw Nebula from Webb Space Telescope.jpg',
  '2025-07-22 - A Double Detonation Supernova.jpg',
  '2025-07-23 - Fireball over Cape San Blas.jpg',
  '2025-07-24 - Titan Shadow Transit.png',
  '2025-07-25 - Twelve Years of Kappa Cygnids.png',
  '2025-07-26 - Globular Cluster Omega Centauri.jpg',
  '2025-07-27 - Lightning over the Volcano of Water.jpg',
  '2025-07-29 - A Helix Nebula Deep Field.jpg',
  '2025-07-30 - Coronal Loops on the Sun.jpg',
  '2025-08-02 - Fireflies, Meteors, and Milky Way.jpg',
  '2025-08-04 - Blue Arcs Toward Andromeda.jpg',
  '2025-08-05 - NGC 6072 A Complex Planetary Nebula from Webb.jpg',
  '2025-08-06 - Meteor before Galaxy.jpg',
  '2025-08-07 - The Double Cluster in Perseus.jpg',
  '2025-08-10 - Zodiacal Road.jpg',
  '2025-08-12 - Perseids from Perseus.jpg',
  '2025-08-13 - Trapezium In the Heart of Orion.jpg',
  '2025-08-14 - M13 The Great Globular Cluster in Hercules.jpg',
  '2025-08-15 - Moonlight, Planets, and Perseids.jpg',
  '2025-08-17 - Asperitas Clouds Over New Zealand.jpg',
  '2025-08-18 - NGC 1309 A Useful Spiral Galaxy.jpg',
  '2025-08-19 - Giant Galaxies in Pavo.jpg',
  '2025-08-20 - Perseid Meteors from Durdle Door.jpg'
];

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  // Select random space image on component mount
  useEffect(() => {
    console.log('🔄 Starting image selection process...');
    
    const randomIndex = Math.floor(Math.random() * spaceImages.length);
    const selectedImage = spaceImages[randomIndex];
    
    console.log('📊 Image selection details:', {
      totalImages: spaceImages.length,
      randomIndex: randomIndex,
      selectedImage: selectedImage,
      fullPath: `/space/${selectedImage}`
    });
    
    // Use the image as a regular URL (not dynamic import)
    const url = `/space/${selectedImage}`;
    const encodedUrl = encodeURI(url); // handles spaces, commas, etc.
    console.log('️ Setting image URL:', encodedUrl);
    
    setBackgroundImage(encodedUrl);
    console.log('✅ Background image set to:', encodedUrl);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const { data } = await auth.login(email, password);
      const { token, user } = data;
      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setTempToken(null);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTempToken(token);
      }
      onLogin(user);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        width: '100%',
      }}
    >
      {/* Left side - Login form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'rgb(9, 9, 11)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Company Logo - hidden for now */}
        {/* 
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component="img"
            src="/src/assets/logos/Alex_favicon.png"
            alt="Company Logo 1"
            sx={{
              height: '32px',
              width: 'auto',
              maxWidth: '80px',
              objectFit: 'contain',
            }}
          />
          <Box
            component="img"
            src="/src/assets/logos/Demelina_favicon.png"
            alt="Company Logo 2"
            sx={{
              height: '32px',
              width: 'auto',
              maxWidth: '80px',
              objectFit: 'contain',
            }}
          />
        </Box>
        */}

        {/* Login Form Container */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Stack spacing={4}>


          <Typography level="h2" sx={{ color: '#e0e0e0', alignSelf: 'flex-start', fontWeight: 'bold' }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel sx={{ color: '#e0e0e0', mb: 1, fontSize: '14px', fontWeight: 'bold' }}>Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    backgroundColor: '#06090f',
                    color: '#e0e0e0',
                    borderColor: '#2f3b52',
                    height: '40px',
                    '&:hover': {
                      borderColor: '#4a5568',
                    },
                    '&:focus-within': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ color: '#e0e0e0', mb: 1, fontSize: '14px', fontWeight: 'bold' }}>Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: ' #06090f',
                    color: ' #e0e0e0',
                    borderColor: '#2f3b52',
                    height: '40px',
                    '&:hover': {
                      borderColor: '#4a5568',
                    },
                    '&:focus-within': {
                      borderColor: '#e0e0e0',
                    },
                  }}
                />
              </FormControl>
                <Checkbox
                 checked={remember}
                 onChange={(e) => setRemember(e.target.checked)}
                 label="Remember me"
                 size="sm"
                 variant="outlined"
                 sx={{
                   color: '#e0e0e0',
                   alignSelf: 'flex-start',
                  
                  '& .MuiCheckbox-checkbox': {
                    backgroundColor: ' #06090f',
                    borderColor: ' #2f3b52',
                    '&:hover': {
                      backgroundColor: ' #06090f',
                      borderColor: ' #4a5568',
                    },
                  },
                    '&.Mui-checked .MuiCheckbox-checkbox': {
                     backgroundColor: ' #106ccc',
                     borderColor: ' #106ccc',
                   },
                   '& .MuiSvgIcon-root': {
                     color: '#ffffff',
                   },
                   '&.Mui-checked .MuiSvgIcon-root': {
                     color: '#ffffff',
                   },
                 }}
               />
              {error && (
                <Typography level="body-sm" color="danger" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="solid"
                sx={{
                  width: '100%',
                  backgroundColor: '#106ccc',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { 
                    backgroundColor: '#42a5f5',
                    color: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  },
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Right side - Background image */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: backgroundImage
            ? `url("${backgroundImage}")`
            : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better contrast */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </Box>
    </Box>
  );
 }

export default Login;