import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Avatar,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { ChatIcon, CloseIcon, ArrowUpIcon, RepeatIcon } from '@chakra-ui/icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Groq API configuration
  const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewConversation = () => {
    setMessages([]);
    setInputMessage('');
    setIsTyping(false);
    // Send welcome message for new conversation
    setTimeout(() => {
      addBotMessage("Hello! I'm your AI interior design assistant from Namaste Design Studios. I'm here to help you create your dream space. What kind of project are you considering?");
    }, 500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chat opens for the first time
      setTimeout(() => {
        addBotMessage("Hello! I'm your AI interior design assistant from Namaste Design Studios. I'm here to help you create your dream space. What kind of project are you considering?");
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getGroqResponse = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Check if API key is available
      if (!GROQ_API_KEY) {
        throw new Error('Groq API key not configured');
      }
      // Build conversation context
      const systemPrompt = `You are an intelligent interior design assistant for Namaste Design Studios. Your role is to:

1. Help potential clients with interior design questions
2. Qualify leads by understanding their needs, budget, and timeline
3. Provide helpful information about our services:
   - Residential Design: Complete home makeovers, room renovations
   - Commercial Design: Office spaces, retail stores  
   - E-Design: Virtual design consultations
4. Guide interested clients to contact us via WhatsApp (7001837559), phone, or contact form
5. Be friendly, professional, and knowledgeable about interior design trends

Keep responses concise (2-3 sentences max) and always try to understand the client's specific needs.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-6).map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: messages,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm here to help with your interior design needs! Could you tell me more about your project?";
    } catch (error) {
      console.error('Groq API error:', error);
      // Return a simple error message if API fails
      throw new Error('Unable to connect to AI assistant. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    addUserMessage(userMsg);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get intelligent response from Groq
      const response = await getGroqResponse(userMsg, messages);
      addBotMessage(response);
    } catch (error) {
      console.error('Error getting bot response:', error);
      addBotMessage("I'm having trouble connecting right now. Please try again or contact us directly via WhatsApp!");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <IconButton
        aria-label="Open chat"
        icon={isOpen ? <CloseIcon /> : <ChatIcon />}
        position="fixed"
        top="50%"
        right="30px"
        transform="translateY(70px)"
        width="56px"
        height="56px"
        colorScheme="blue"
        borderRadius="full"
        boxShadow="lg"
        zIndex="1001"
        onClick={() => {
          if (!isOpen) {
            startNewConversation();
          }
          onToggle();
        }}
        _hover={{ transform: 'translateY(70px) scale(1.1)' }}
        transition="all 0.2s ease-in-out"
      />

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Box
          position="fixed"
          top="50%"
          right="30px"
          transform="translateY(-250px)"
          width="350px"
          height="500px"
          bg="white"
          borderRadius="lg"
          boxShadow="2xl"
          border="1px solid"
          borderColor="gray.200"
          zIndex="1000"
          display="flex"
          flexDirection="column"
        >
          {/* Chat Header */}
          <Flex
            bg="blue.500"
            color="white"
            p="4"
            borderTopRadius="lg"
            align="center"
            justify="space-between"
          >
            <Flex align="center">
              <Avatar size="sm" name="Design Assistant" mr="3" />
              <VStack align="start" spacing="0">
                <Text fontWeight="bold" fontSize="sm">Design Assistant</Text>
                <Text fontSize="xs" opacity="0.8">Online now</Text>
              </VStack>
            </Flex>
            <IconButton
              aria-label="Start new conversation"
              icon={<RepeatIcon />}
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: "blue.600" }}
              onClick={startNewConversation}
            />
          </Flex>

          {/* Messages Area */}
          <VStack
            flex="1"
            p="4"
            spacing="3"
            align="stretch"
            overflowY="auto"
            bg="gray.50"
          >
            {messages.map((message) => (
              <Flex
                key={message.id}
                justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Box
                  bg={message.sender === 'user' ? 'blue.500' : 'white'}
                  color={message.sender === 'user' ? 'white' : 'black'}
                  px="3"
                  py="2"
                  borderRadius="lg"
                  maxW="80%"
                  boxShadow="sm"
                  whiteSpace="pre-line"
                >
                  <Text fontSize="sm">{message.text}</Text>
                </Box>
              </Flex>
            ))}
            
            {isTyping && (
              <Flex justify="flex-start">
                <Box
                  bg="white"
                  px="3"
                  py="2"
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Text fontSize="sm" color="gray.500">Typing...</Text>
                </Box>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input Area */}
          <HStack p="4" bg="white" borderBottomRadius="lg">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="sm"
              borderRadius="full"
            />
            <IconButton
              aria-label="Send message"
              icon={<ArrowUpIcon />}
              onClick={handleSendMessage}
              colorScheme="blue"
              size="sm"
              borderRadius="full"
              isDisabled={!inputMessage.trim()}
            />
          </HStack>
        </Box>
      </Collapse>
    </>
  );
};

export default ChatAssistant;
