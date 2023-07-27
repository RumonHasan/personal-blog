import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  Container,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CreateCommentStyles.css';
import {
  graphcms,
  CREATE_COMMENT,
  PUBLISH_COMMENT,
} from '../../Graphql/Mutations';
import {
  QUERY_BLOG_POST_COMMENTS,
  graphcms as graphCommentCms,
} from '../../Graphql/Queries';
import Comment from '../Comment/Comment';

const CreateComments = (props) => {
  const { blogPostCommentId } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const { slug } = useParams();
  const [comments, setComments] = useState([]);
  const [commentTrigger, setCommentTrigger] = useState(0);

  // getting the comments of the post
  useEffect(() => {
    const getComments = async () => {
      try {
        const { comments } = await graphCommentCms.request(
          QUERY_BLOG_POST_COMMENTS,
          {
            id: blogPostCommentId,
          }
        );
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [blogPostCommentId, commentTrigger]);

  const clearFields = () => {
    setName('');
    setComment('');
    setEmail('');
  };

  // submitting the comment
  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      if (name && email && comment) {
        const commentObject = {
          name,
          email,
          comment,
          slug,
        };
        const { createComment } = await graphcms.request(
          CREATE_COMMENT,
          commentObject
        );
        // publishing the comment to the post directly
        await graphcms.request(PUBLISH_COMMENT, { id: createComment?.id });
        setCommentTrigger((prevTrigger) => prevTrigger + 1);
        clearFields();
      } else {
        alert('You have an empty field');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card
        className="comments-container"
        sx={{ marginBottom: '16px', overflow: 'hidden' }}
      >
        <CardHeader title="Comments From Readers:" />
        <CardContent sx={{ overflow: 'auto', maxHeight: '300px' }}>
          <Grid
            container
            spacing={2}
            sx={{ overflow: 'auto', padding: '16px' }}
          >
            {comments?.map((commentObject) => {
              const { name, comment, id } = commentObject;
              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Comment author={name} content={comment} />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmitComment}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comment"
              variant="outlined"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Leave a Comment!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

CreateComments.propTypes = {
  blogPostCommentId: PropTypes.any,
};

export default CreateComments;
