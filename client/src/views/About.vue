<template>
	<div id="about" class="routercontent margin10 content-paragraph">
		<div class="fullpagetextview automargin alignlistitems">
			<p>
				Bayograff was developed by GlosuU in 2020, during the Covid-19 pandemic and
				quarantine. GlosuU wanted to write his biography, but felt that a text editor was
				not a good enough tool for it. He thought of a simple way to structure biography
				texts and decided to program his vision, making it a web service so that other people
				could benefit from it too.
			</p>
			<p>
				Bayograff is <strong>free</strong>, <strong>open source</strong> and available in
				GitHub under an <strong>MIT License</strong>:
				<a href="https://github.com/GlosuU/bayograff" target="_new">
					https://github.com/GlosuU/bayograff
				</a>
			</p>
			<p>
				If you have questions, bug reports or wish to contact GlosuU, you can
				<a href="mailto:bayograff.website@gmail.com">e-mail</a> him or contact him via
				different social media (links can be found at the footer of the website). GlosuU
				accepts donations for maintaining and improving Bayograff, you can donate via
				<strong>PayPal</strong>:
			</p>
			<div class="centeraligned">
				<DonateButton :big="true" />
			</div>
			<hr />
			<p>Here are the <strong>major tools</strong> used to develop Bayograff:</p>
			<ul>
				<li>
					<p>
						<a href="https://vuejs.org/" target="_new">Vue.js</a>- a progressive
						framework for building user interfaces. Bayograff's frontend client is
						written in JavaScript with the Vue framework.
					</p>
				</li>
				<li>
					<p>
						<a href="https://bootstrap-vue.org/" target="_new">BootstrapVue</a>-
						Bootstrap is the world's most popular frontend CSS library. The
						BootstrapVue project contains tons of components designed and adapted for
						ad-hoc use with the Vue framework.
					</p>
				</li>
				<li>
					<p>
						<a href="https://expressjs.com/" target="_new">Express</a>and
						<a href="https://nodejs.org/" target="_new">Node.js</a>- Bayograff's
						backend server is written in JavaScript using the Express framework, a
						minimalist and flexible Node web application framework. Node.js is a JavaScript
						runtime built on Chrome's V8 JavaScript engine.
					</p>
				</li>
				<li>
					<p>
						<a href="https://latexonline.cc/" target="_new">Latex.Online</a>- Bayograff
						uses the Latex.Online API to generate biographies as PDFs.
					</p>
				</li>
				<li>
					<p>
						<a href="https://www.mongodb.com/" target="_new">MongoDB</a>- For its
						database, Bayograff uses MongoDB: a general purpose, document-based,
						distributed database. Bayograff uses
						<a href="https://www.mongodb.com/cloud/atlas" target="_new">Atlas</a>to
						store its data in the cloud and
						<a href="https://mongoosejs.com/" target="_new">Mongoose</a>to access it.
					</p>
				</li>
				<li>
					<p>
						<a href="https://auth0.com/" target="_new">Auth0</a>- Bayograff handles user
						authentication and authorization through the Auth0 platform.
					</p>
				</li>
				<li>
					<p>
						<a href="https://render.com/" target="_new">Render</a>- Bayograff is
						currently hosted in Render, a unified cloud where developers can build and
            run all apps and websites. As a note, Bayograff was originally hosted in Heroku.
            Older videos and references to Bayograff can include the old Heroku domain, but
            Bayograff is no longer hosted there.
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import DonateButton from "../components/buttons/DonateButton";
	export default {
		components: {
			DonateButton,
		},
	};
</script>

<style />
