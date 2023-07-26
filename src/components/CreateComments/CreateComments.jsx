import { useState } from 'react';
import { Button, TextField, Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import './CreateCommentStyles.css';
import {
  graphcms,
  CREATE_COMMENT,
  PUBLISH_COMMENT,
} from '../../Graphql/Mutations';

const CreateComments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const { slug } = useParams();

  const clearFields = () => {
    setName('');
    setComment('');
    setEmail('');
  };

  // submitting the comment
  const handleSubmitComment = async (event) => {
    event.preventDefault();
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
    clearFields();
  };

  return (
    <Container maxWidth="sm">
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
              Post Your Comment!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateComments;
