mkdir -p docs/generated/tasks
cp docs/tasks/_category_.json docs/generated/tasks/_category_.json
azext readme generate --input ./docs/index.md --output ./docs/generated/index.md --profile doc-site
azext readme generate --input ./docs/tasks/git-guard-changes.md --output ./docs/generated/tasks/git-guard-changes.md --profile doc-site

azext readme generate --input ./tasks/git-guard-changes/docs/README.md --output ./tasks/git-guard-changes/README.md --profile github

azext changelog generate

echo "---\nsidebar_position: 2\ntitle: 'Changelog'\n---\n$(cat CHANGELOG.md)" > ./docs/generated/changelog.md