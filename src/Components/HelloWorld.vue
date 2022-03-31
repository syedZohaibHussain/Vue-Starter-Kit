<template>
	<div class="row">
		<div class="col-lg-8 col-md-10 mx-auto">
			<input type="file" name="" id="" class="form-control" @change="onFileChange" />
			<div class="clearfix"> </div>
			<img :src="image" />
		</div>
	</div>
</template>

<script>
	import ExcelJS from "exceljs";
	import Repository from "src/Repositories/RepositoryFactory";
	const PostRepository = Repository.get("posts");
	export default {
		name: "Posts",
		components: {},
		data() {
			return {
				posts: [],
				image: ''
			};
		},
		created() {
			this.getPosts();
		},
		methods: {
			getPosts: async function() {
				const {
					data
				} = await PostRepository.get();
				this.posts = data;
			},
			onFileChange(e) {
				var files = e.target.files || e.dataTransfer.files;
				if (!files.length)
					return;
				this.createImage(files[0]);
			},
			createImage(file) {
				// let image = new Image();
				let reader = new FileReader();
				reader.onload = async (e) => {
					const buffer	= Buffer.from(e.target.result, 'base64');
					const workbook	= new ExcelJS.Workbook();
					workbook.xlsx.load(buffer).then(_workbook => {
						console.log(_workbook, 'workbook instance')
						_workbook.eachSheet((sheet, id) => {
							sheet.eachRow((row, rowIndex) => {
								console.log(id, row.values, rowIndex)
							})
						})
					})
				};
				reader.readAsDataURL(file);
				// console.log(image);
			},
			removeImage: function() {
				this.image = '';
			},
		}
	};
</script>