import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Grid, 
  VStack,
  HStack,
  Image
} from '@chakra-ui/react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, image, readTime }) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        borderColor: 'purple.200'
      }}
    >
      <Image 
        src={image} 
        alt={title}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      <VStack align="flex-start" spacing="4" p="6">
        <HStack spacing="4" fontSize="sm" color="gray.500">
          <Text>{date}</Text>
          <Text>•</Text>
          <Text>{readTime}</Text>
        </HStack>
        
        <Heading as="h3" size="md" color="gray.800" lineHeight="shorter">
          {title}
        </Heading>
        
        <Text color="gray.600" fontSize="sm" lineHeight="tall">
          {excerpt}
        </Text>
        
        <Text 
          color="purple.500" 
          fontWeight="medium" 
          fontSize="sm"
          cursor="pointer"
          _hover={{ color: 'purple.600' }}
        >
          Read More →
        </Text>
      </VStack>
    </Box>
  );
};

const BlogSection: React.FC = () => {
  const blogPosts = [
    {
      title: "10 Interior Design Trends for 2024",
      excerpt: "Discover the latest trends that are shaping interior design this year, from sustainable materials to bold color palettes.",
      date: "Dec 15, 2023",
      image: "/grid/1.png",
      readTime: "5 min read"
    },
    {
      title: "Small Space, Big Impact: Maximizing Your Home",
      excerpt: "Learn how to make the most of limited space with clever design solutions and multi-functional furniture.",
      date: "Dec 10, 2023",
      image: "/grid/2.png",
      readTime: "7 min read"
    },
    {
      title: "The Psychology of Color in Interior Design",
      excerpt: "Understand how different colors affect mood and atmosphere, and how to choose the perfect palette for your space.",
      date: "Dec 5, 2023",
      image: "/grid/3.png",
      readTime: "6 min read"
    }
  ];

  return (
    <Box id="blog" py="20" px={['1.5em', '1.5em', '1.5em', '15%']} bg="white">
      <VStack spacing="16" align="center">
        {/* Header */}
        <VStack spacing="6" textAlign="center" maxW="600px">
          <Box
            bg="purple.100"
            color="purple.600"
            px="4"
            py="2"
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            Our Blog
          </Box>
          
          <Heading
            as="h2"
            size="2xl"
            fontWeight="black"
            color="gray.800"
            lineHeight="shorter"
          >
            Design Insights &{' '}
            <Text as="span" color="purple.500">
              Inspiration
            </Text>
          </Heading>
          
          <Text fontSize="xl" color="gray.600" lineHeight="tall">
            Stay updated with the latest trends, tips, and insights from our design experts.
          </Text>
        </VStack>

        {/* Blog Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="8"
          w="full"
        >
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
              readTime={post.readTime}
            />
          ))}
        </Grid>

        {/* CTA */}
        <VStack spacing="6" textAlign="center">
          <Text fontSize="lg" color="gray.600">
            Want to stay updated with our latest insights?
          </Text>
          <Box
            bg="purple.500"
            color="white"
            px="8"
            py="4"
            borderRadius="xl"
            fontWeight="bold"
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{
              bg: 'purple.600',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 30px rgba(128, 90, 213, 0.3)'
            }}
          >
            View All Articles
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default BlogSection;
