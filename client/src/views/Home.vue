<template>
	<div id="home" class="routercontent margin10 content-paragraph">
		<h1 class="centeraligned">Welcome to Bayograff!</h1>
		<p class="centeraligned">
			If it's your first time here, watch the video below for an introduction:
		</p>
		<div class="video centeraligned">
			<b-embed
				type="iframe"
				aspect="16by9"
				src="https://www.youtube.com/embed/yGFuRRKk7UA"
				allowfullscreen
			/>
		</div>

		<hr />
		<div class="fullpagetextview automargin alignlistitems">
			<p>
				Bayograff is a website designed to help you write down your biography. Instead of
				writing everything in one single document, you can write separate blocks of text and
				Bayograff will automatically order them for you according to specified dates. This
				helps to dynamically and easily write and edit your biography. When you are done,
				you can then export the whole biography to a PDF file.
			</p>
			<p>There are 3 distinct elements or text blocks in Bayograff:</p>
			<ol>
				<li>
					<p>
						<strong>
							<span class="textred">REPORTERM</span> = "Report" + "Term".
						</strong>
						These are intended to represent summaries or descriptions of a period of
						time, hence the <em>report of a term</em>. Examples could be "my last year
						at university", "my summer holidays in Paris", "my childhood"... Every
						reporterm has a start date and an end date to define the period of time it
						covers. It is recommended for different reporterms not to overlap each
						other.
					</p>
				</li>
				<li>
					<p>
						<strong>
							<span class="textblue">ANECDAYNOTE</span> = "Anecdote" + "Day Note".
						</strong>
						These are intended to represent isolated days or events that deserve their
						own details, hence an <em>anecdote</em> or a <em>day note</em>. Examples
						could be "my graduation day", "the day I won a chess tournament", "my
						wedding"... Every anecdaynote has an associated date, which doesn't need to
						be exact (it only helps Bayograff place it in the timeline). If "the day I
						won a chess tournament" happened sometime in summer of 2015, I could give it
						the date June 15th, 2015. Bayograff can also show you which anecdaynotes
						happened in a given reporterm.
					</p>
				</li>
				<li>
					<p>
						<strong> <span class="textgreen">FACTALE</span> = "Fact" + "Tale". </strong>
						These are intended to represent random information that you want to include
						in your biography but is not bound to the timeline, so random
						<em>facts</em> or <em>tales</em> you'd like to include. Examples could be
						"my top 10 favorite movies of all time", "all the places I have visited",
						"how I learned to love the piano"... Factales will be included as appendices
						at the end of your biography, after the reporterms and anecdaynotes.
					</p>
				</li>
			</ol>
			<p>
				And that's all you need to know! Simple, right? Log in with your Google account or
				your e-mail address and get started right away! Happy writing!
			</p>
		</div>
	</div>
</template>

<script>
	export default {};
</script>

<style />
