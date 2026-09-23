// // components/ChakraUIComponent.tsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Button,
//   Switch,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Stack,
//   HStack,
//   VStack,
//   Badge,
//   useColorMode,
//   IconButton,
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
//   Alert,
//   AlertIcon,
//   Progress,
//   Tag,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { SunIcon, MoonIcon, StarIcon, AddIcon } from '@chakra-ui/icons';

// const ChakraUIComponent: React.FC = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [sliderValue, setSliderValue] = useState(50);
//   const [rating, setRating] = useState(0);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} minH="100vh" py={8}>
//       <Container maxW="6xl">
//         {/* Header */}
//         <VStack spacing={6} mb={8} textAlign="center">
//           <Heading 
//             size="2xl" 
//             bgGradient="linear(to-r, blue.400, purple.500)"
//             bgClip="text"
//           >
//             Chakra UI Demo
//           </Heading>
//           <Text fontSize="xl" color="gray.600" maxW="2xl">
//             Accessible, themeable UI components with dark mode support
//           </Text>
//           <HStack spacing={4}>
//             <Tag colorScheme="blue">Accessible</Tag>
//             <Tag colorScheme="purple">Themeable</Tag>
//             <Tag colorScheme="green">Dark Mode</Tag>
//             <Tag colorScheme="orange">Composable</Tag>
//           </HStack>
//         </VStack>

//         {/* Color Mode Toggle */}
//         <Box display="flex" justifyContent="flex-end" mb={6}>
//           <IconButton
//             aria-label="Toggle color mode"
//             icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//             onClick={toggleColorMode}
//             variant="outline"
//           />
//         </Box>

//         <Stack direction={{ base: 'column', lg: 'row' }} spacing={6}>
//           {/* Card 1 - Interactive Controls */}
//           <Card variant="elevated" flex={1}>
//             <CardHeader>
//               <Heading size="md">Interactive Components</Heading>
//             </CardHeader>
//             <CardBody>
//               <VStack spacing={6} align="stretch">
//                 <FormControl display="flex" alignItems="center">
//                   <FormLabel htmlFor="dark-mode" mb="0">
//                     Dark Mode
//                   </FormLabel>
//                   <Switch 
//                     id="dark-mode" 
//                     isChecked={colorMode === 'dark'}
//                     onChange={toggleColorMode}
//                     colorScheme="purple"
//                   />
//                 </FormControl>

//                 <Box>
//                   <Text mb={2}>Slider Value: {sliderValue}</Text>
//                   <Slider
//                     value={sliderValue}
//                     onChange={setSliderValue}
//                     colorScheme="pink"
//                   >
//                     <SliderTrack>
//                       <SliderFilledTrack />
//                     </SliderTrack>
//                     <SliderThumb />
//                   </Slider>
//                 </Box>

//                 <Box>
//                   <Text mb={2}>Rating</Text>
//                   <HStack>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <IconButton
//                         key={star}
//                         aria-label={`Rate ${star}`}
//                         icon={<StarIcon />}
//                         color={star <= rating ? 'yellow.400' : 'gray.300'}
//                         onClick={() => setRating(star)}
//                         variant="ghost"
//                       />
//                     ))}
//                   </HStack>
//                 </Box>

//                 <Progress value={sliderValue} colorScheme="green" borderRadius="full" />
//               </VStack>
//             </CardBody>
//             <CardFooter>
//               <Button colorScheme="blue" onClick={onOpen}>
//                 Open Modal
//               </Button>
//             </CardFooter>
//           </Card>

//           {/* Card 2 - Form Elements */}
//           <Card variant="elevated" flex={1}>
//             <CardHeader>
//               <Heading size="md">Form Elements</Heading>
//             </CardHeader>
//             <CardBody>
//               <VStack spacing={4}>
//                 <Alert status="info" borderRadius="md">
//                   <AlertIcon />
//                   Please fill out the form below
//                 </Alert>

//                 <FormControl>
//                   <FormLabel>Email Address</FormLabel>
//                   <Input type="email" placeholder="Enter your email" />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel>Message</FormLabel>
//                   <Textarea placeholder="Enter your message" rows={4} />
//                 </FormControl>

//                 <Button colorScheme="green" width="full" leftIcon={<AddIcon />}>
//                   Submit Form
//                 </Button>
//               </VStack>
//             </CardBody>
//           </Card>

//           {/* Card 3 - Status & Badges */}
//           <Card variant="elevated" flex={1}>
//             <CardHeader>
//               <Heading size="md">Status & Feedback</Heading>
//             </CardHeader>
//             <CardBody>
//               <VStack spacing={4} align="stretch">
//                 <HStack>
//                   <Badge colorScheme="green">Success</Badge>
//                   <Badge colorScheme="red">Error</Badge>
//                   <Badge colorScheme="yellow">Warning</Badge>
//                   <Badge colorScheme="blue">Info</Badge>
//                 </HStack>

//                 <Alert status="success" borderRadius="md">
//                   <AlertIcon />
//                   Operation completed successfully!
//                 </Alert>

//                 <Alert status="warning" borderRadius="md">
//                   <AlertIcon />
//                   Please check your input data
//                 </Alert>

//                 <Box>
//                   <Text mb={2}>Upload Progress</Text>
//                   <Progress value={65} colorScheme="blue" borderRadius="full" />
//                 </Box>

//                 <Button variant="outline" colorScheme="purple" width="full">
//                   Secondary Action
//                 </Button>
//               </VStack>
//             </CardBody>
//           </Card>
//         </Stack>

//         {/* Modal */}
//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Chakra UI Modal</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Text>
//                 This is a fully accessible modal component with proper focus management
//                 and keyboard navigation.
//               </Text>
//             </ModalBody>
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} onClick={onClose}>
//                 Close
//               </Button>
//               <Button variant="outline">Secondary Action</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </Container>
//     </Box>
//   );
// };

// // export default ChakraUIComponent;
export default {}