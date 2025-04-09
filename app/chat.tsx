import Chat from '@codsod/react-native-chat';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { aiModelsSystemGeneriqueAsk, aiModelsSystemUniqueAsk } from '~/constants/aiDatas';
import { chatFaceData } from '~/constants/datas';
import { callChat } from '~/lib/aiAction';
import { ChatFaceElement } from '~/types/type';

const ChatWIthAi = () => {
  const { id } = useLocalSearchParams();

  const [memeSelected, setMemeSelected] = useState<ChatFaceElement>({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const selectedId = Number(id);
    setMemeSelected(chatFaceData[selectedId - 1]);
    setMessages([
      {
        _id: 1,
        text: 'Hey!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: memeSelected.name ? memeSelected.name : chatFaceData[selectedId - 1].name,
        },
      },
    ] as any);
  }, []);
  console.log(memeSelected);
  if (!id) {
    return <Redirect href="/" />;
  }

  const getBardResp = async ({ userMessage }: { userMessage: string }) => {
    try {
      const modelName = 'meta-llama/llama-4-maverick:free';
      const systemMessage =
        aiModelsSystemUniqueAsk[memeSelected.id as number] + aiModelsSystemGeneriqueAsk;
      const repondChat = await callChat({ modelName, systemMessage, userMessage });
      return repondChat && repondChat.choices[0].message.content;
    } catch (error) {
      console.error(error);
    }
  };

  const respondMessage = async (text: string) => {
    try {
      const reponseFinal = await getBardResp(text);

      if (reponseFinal) {
        setMessages(
          (prevMessages: any) =>
            [
              {
                _id: Math.random() * (9999999 - 1),
                text: reponseFinal,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'test',
                },
              },
              ...prevMessages,
            ] as any
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSendMessage = async (text: string) => {
    try {
      if (text) {
        setMessages(
          (prevMessages: any) =>
            [
              {
                _id: prevMessages.length + 1,
                text,
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'test',
                },
              },
              ...prevMessages,
            ] as any
        );
        respondMessage(text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Chat
      messages={messages}
      setMessages={(val) => onSendMessage(val)}
      themeColor={memeSelected.primary as string}
      themeTextColor="white"
      showSenderAvatar={false}
      showReceiverAvatar
      inputBorderColor={memeSelected.primary as string}
      user={{
        _id: 1,
        name: memeSelected.name as string,
      }}
      backgroundColor="white"
      inputBackgroundColor="white"
      placeholder="Enter Your Message"
      placeholderColor="gray"
      backgroundImage={memeSelected.image}
      showEmoji={false}
      //onPressEmoji={() => console.log('Emoji Button Pressed..')}
      showAttachment={false}
      //onPressAttachment={() => console.log('Attachment Button Pressed..')}
      timeContainerColor={memeSelected.primary as string}
      timeContainerTextColor="white"
      //onEndReached={() => alert('You have reached the end of the page')}
    />
  );
};

export default ChatWIthAi;
