import PostRepository from './PostRepository';

const repositories = {
    'posts': PostRepository,
}
export default {
    get: name => repositories[name]
};