<template>
	<div class="row">
		<div class="col-lg-8 col-md-10 mx-auto">
			<button class="btn btn-info"
				@click="getPermissions"
			>
				Click me!
			</button>
			<div class="clearfix"> </div>
			<ul>
				<li v-if="$can('edit-product')"> 	edit-product </li>
				<li v-if="$can('delete-product')"> 	delete-product </li>
				<li v-if="$can('create-product')"> 	create-product </li>
			</ul>
		</div>
	</div>
</template>

<script>
    import axios from 'axios'
	import { AbilityBuilder, Ability } from '@casl/ability';
	import Repository from "src/Repositories/RepositoryFactory";
	const PostRepository = Repository.get("posts");
	export default {
		name: "Posts",
		components: {},
		data() {
			return {
				posts: []
			};
		},
		created() {
			this.getPosts();
		},
		methods: {
			async getPosts() {
				// const {
				// 	data
				// } = await PostRepository.get();
				// this.posts = data;
				PostRepository.get().then((response) => {
					this.posts = response
				})
			},
			getPermissions() {
				const _this = this;
				var data = {};
				var config = {
					method: 'post',
					url: 'http://localhost:9001/oauth/token?grant_type=password&username=bob&password=bobspassword&scope=read',
					headers: {
						'Authorization': 'Basic Y2xpZW50OnNlY3JldA=='
					},
					data: data
				};
				axios(config)
					.then(function(response) {
						const authorities = response.data.authorities
						const { can, rules } = new AbilityBuilder(Ability);
						for (let i = 0; i < authorities.length; i++) {
							can(authorities[i]);
						}
						_this.$ability.update(rules); // 
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	};
</script>