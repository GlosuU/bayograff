<template>
	<div :class="['texteditor', focused ? 'outlined' : '']">
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<div class="menubar">
				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.bold()"
					@click="commands.bold"
				>
					<b-icon icon="type-bold" />
				</b-button>

				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.italic()"
					@click="commands.italic"
				>
					<b-icon icon="type-italic" />
				</b-button>

				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.underline()"
					@click="commands.underline"
				>
					<b-icon icon="type-underline" />
				</b-button>

				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.strike()"
					@click="commands.strike"
				>
					<b-icon icon="type-strikethrough" />
				</b-button>

				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.bullet_list()"
					@click="commands.bullet_list"
				>
					<b-icon icon="list-ul" />
				</b-button>

				<b-button
					size="lg"
					variant="light"
					:pressed="isActive.ordered_list()"
					@click="commands.ordered_list"
				>
					<b-icon icon="list-ol" />
				</b-button>

				<!-- <b-button size="lg" variant="light" @click="commands.undo">
					<b-icon icon="arrow90deg-left" />
				</b-button>

				<b-button size="lg" variant="light" @click="commands.redo">
					<b-icon icon="arrow90deg-right" />
				</b-button> -->
			</div>
		</editor-menu-bar>

		<editor-content class="texteditor__content" :editor="editor" />
	</div>
</template>

<script>
	import { Editor, EditorContent, EditorMenuBar } from "tiptap";
	import {
		Bold,
		Italic,
		Underline,
		Strike,
		ListItem,
		BulletList,
		OrderedList,
		Placeholder,
		History,
	} from "tiptap-extensions";

	export default {
		props: ["initialContent"],
		components: {
			EditorContent,
			EditorMenuBar,
		},
		data() {
			return {
				focused: false,
				editor: new Editor({
					extensions: [
						new Bold(),
						new Italic(),
						new Underline(),
						new Strike(),
						new ListItem(),
						new BulletList(),
						new OrderedList(),
						new History(),
						new Placeholder({
							emptyEditorClass: "is-editor-empty",
							emptyNodeClass: "is-empty",
							emptyNodeText: "Enter content",
							showOnlyWhenEditable: true,
							showOnlyCurrent: true,
						}),
					],
					content: this.initialContent,
					onUpdate: () => {
						// emit new content on update
						this.focused = false;
						// console.log("editor-content", this.editor.getHTML());
						this.$emit("editor-updated", this.editor.getHTML());
					},
					onFocus: () => {
						this.focused = true;
					},
				}),
			};
		},
		beforeDestroy() {
			this.editor.destroy();
		},
	};
</script>

<style lang="scss">
	.texteditor {
		background-color: white;
		color: black;
		border: 3px solid transparent;

		&__content {
			overflow-wrap: break-word;
			word-wrap: break-word;
			word-break: break-word;
			padding: 10px;

			* {
				caret-color: currentColor;
			}

			ul,
			ol {
				padding-left: 40px;
			}

			li > p,
			li > ol,
			li > ul {
				margin: 0;
			}

			.resize-cursor {
				cursor: ew-resize;
				cursor: col-resize;
			}
		}

		p.is-editor-empty:first-child::before {
			content: attr(data-empty-text);
			float: left;
			color: rgb(126, 126, 126);
			pointer-events: none;
			height: 0;
		}
	}

	.menubar {
		border-bottom: 1px solid black;
	}

	.ProseMirror:focus {
		outline: none;
	}

	.outlined {
		border-color: blue;
	}

	.borderButton {
		color: red;
	}
</style>
