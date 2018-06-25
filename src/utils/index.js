export const typeOfEntityToAffect = (entityToBeAffected) => (
  Object.keys(entityToBeAffected).includes('commentCount') ?
    'post' : 'comment'
);
