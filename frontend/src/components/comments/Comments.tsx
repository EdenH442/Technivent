import React, { useContext, useState } from 'react';
import {  Button, Textarea, Card, Pagination, Flex, Center, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CommentData } from '../../utils/Types';
import Api from '../../utils/Api';
import { userContext } from '../layouts/home/Home';

interface CommentsProps {
    Comments: CommentData[],
    eventID: string,
    isBackOffice?: boolean
}

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

const Comments: React.FC<CommentsProps> = ({Comments, eventID, isBackOffice}) => {
    const { username } = useContext(userContext);
    if(isBackOffice)
    {
        const numberOfComments = Comments.length;
        return (
            <Flex justify={Center} direction={"column"}>
                 <h2>Comments: {numberOfComments}</h2>
            </Flex>
        );
    }
    const form = useForm({
        initialValues: {
          commentText: ''
        },
        validate: (values) => ({
            commentText: !values.commentText ? 'Please enter your comment' : null,
            })
      });

      const [activePage, setPage] = useState(1);
      const sortedComments = Comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const paginatedComments = chunk(sortedComments, 3); 
      const items = paginatedComments[activePage - 1] ? paginatedComments[activePage - 1].map((item, index) => (
        <Card key={index} m={"10px"} w={"20rem"}>
            <Card.Section>
                <Group justify={"center"} mt={"sm"} >
                    <Text>From: {item.username}</Text>
                    <Text>At: {`${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}/${new Date(item.date).getFullYear()}`}</Text>
                </Group>
            </Card.Section>
            <Card.Section>
                <p>{item.commentText}</p>
            </Card.Section>
        </Card>
      )) : [];

      const [isSuccess, setIsSuccess] = useState(false);

      const PostComment = async (values: {commentText: string}): Promise<void> => {
        const apiService = new Api();     
        const response = await apiService.PostComment({username: username, eventId: eventID, comment: values.commentText});
        if (response) {
          setIsSuccess(true);
          form.reset();
          setTimeout(() => setIsSuccess(false), 5000);
        }
    }

    return (
        <>
        <Flex justify={Center} direction={"column"}>
        <h2>Comments: </h2>
        {items}
        <Pagination total={paginatedComments.length} value={activePage} onChange={setPage} m="sm" />
        <br />
            <form onSubmit={form.onSubmit((values) => PostComment(values))}>
                <Textarea  w={"20rem"}  autosize minRows={1} maxRows={4}
                    label="Add a comment:"
                    placeholder="Write a comment..." 
                    error={form.errors.commentText}
                    {...form.getInputProps('commentText')}
                />
            {isSuccess && <Text size={"sm"}>comment posted! Resresh the page to see it</Text>}
            <Button size="md" type="submit" m={"15px"}> Post </Button>
            </form>
        </Flex>
        </>
    );
};

export default Comments;