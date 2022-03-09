<template>
	<div class="row">
		<div class="col-lg-8 col-md-10 mx-auto">
			<div class="clearfix">
			</div>
		</div>
	</div>
</template>

<script>
	import Repository from "src/Repositories/RepositoryFactory";
	const PostRepository = Repository.get("posts");
	
	export default {
		name: "Posts",
		components: { },
		data() {
			return {
				posts: []
			};
		},
		created() {
			this.getPosts();
		},
		methods: {
			getPosts: async function() {
				const { data } = await PostRepository.get();
				this.posts = data;
			}
		}
	};
</script>