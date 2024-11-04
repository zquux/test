import React from 'react'
import { Text } from '@chakra-ui/react'

const AboutPage = () => {
  return (
    <Text
            fontSize={"20"}
            fontWeight={"bold"}
            bgColor={"white"}
            bgClip={"text"}
            textAlign={"center"}
            marginTop={20}
            marginLeft={20}
            marginRight={20}
        >
            Welcome to Gym Home, your local neighborhood gym dedicated to helping you achieve your fitness goals in a welcoming and friendly environment. We believe that fitness should be accessible to everyone, which is why we offer a variety of classes, modern equipment, and personalized training options at affordable rates. Whether you're just starting out or are a seasoned athlete, our community-focused atmosphere and supportive staff are here to guide and motivate you every step of the way. Join us and become a part of our fitness family—together, let’s make health and wellness a priority!
        </Text>
  )
}

export default AboutPage