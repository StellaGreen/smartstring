
import { useContext, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Input,
  Button,
  Flex,
  Spacer,
  Heading,
  Text,
  Spinner,
  Center,
  useToast,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Web3Context } from 'web3-hooks'
import { SmartStringContext } from './App'
import { SmartStringAddress } from './contracts/SmartString'


function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const smartString = useContext(SmartStringContext)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()
  const {
    isOpen: isOpenLogoutModal,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure()

  const handleOnClickLogin = () => {
    if (!web3State.isLogged) {
      login()
    } else {
    }
  }

  const handleClickSetStorage = async () => {
    try {
      setIsLoading(true)
      let tx = await smartString.createNFT(inputValue)
      await tx.wait()
      toast({
        title: 'You have send your sentence',
        description: `storage is set wiht value: ${inputValue}\nTransaction hash: ${tx.hash}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
    <Box h="38rem" bg="#2A4365" w="79rem" color="white">
      <Box >
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can not logout from a Dapp.</Text>
            <Text >
              Disconnect your MetaMask from this website if you want to logout.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="#553C9A" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </Box>

      <Flex flexDirection="column" alignItems="center" m={4} h="300px">
        <Flex
          justifyContent="space-between"
          width="100%"
          mb={4}
          alignItems="center"
        >
          <Heading size="xl">SmartString</Heading>
          <Button
            bg="#553C9A"
            onClick={() =>
              !web3State.isLogged ? handleOnClickLogin() : onOpenLogoutModal()
            }
          >
            
            {!web3State.isLogged ? 'Log in' : 'Log out'}
          </Button>
        </Flex>
        <Spacer />
        {!smartString ? (
          <>
          <Spacer />
          <Spinner
            size="xl"
            label="Connecting to Ethereum"
            color="blue.500"
            emptyColor="gray.200"
          />
          <Box>
            <Spacer />
            <Text margin="3rem" bg="#E53E3E" color="white" padding="2rem" borderRadius="10" textAlign="center">
            ⛔️
            <br />
            Please login to your metamask making sure you are on the Rinkeby testnet to be able to start the trial.
            </Text>
          </Box>
          </>
        ) : (
          <>
            {web3State.chainId === 4 ? (
              <>
                <Text as="b" fontSize="30" marginTop="4rem" marginBottom="0.5rem">
                  Write your sentence on the blockchain !
                </Text>
                <Spacer/>
                  <Input
                    margin="1rem"
                    padding="4rem"
                    width="32rem"
                    marginBottom="1rem"
                    height="150rem"
                    value={inputValue}
                    placeholder="Your NFT is your imagination ..."
                    onChange={(event) => SetInputValue(event.target.value)}
                  />
                  <Spacer/>
                  <Button
                    isLoading={isLoading}
                    loadingText="setting storage"
                    bg="#553C9A"
                    padding="2rem"
                    onClick={handleClickSetStorage}
                  >
                    Create NFT
                  </Button>
                  <Center pos="relative" size="m" w="10vh" as="i" marginTop="5rem" paddingStart="20rem" paddingEnd="20rem" paddingBottom="2rem" paddingTop="2rem">
                  <Text as="samp">
                  Deployed on Rinkeby at {SmartStringAddress}
                  </Text>
                  </Center>
                
              </>
            ) : (
              <Alert status="error">
                <AlertIcon />
                You are on the wrong network please switch to Rinkeby
                </Alert>
            )}
            
          </>
        )}
      </Flex>
      </Box>
    </>
  );
}

export default Dapp;