<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project handoff

Read `README.md` and `HANDOFF.md` before making project changes. They document current behavior and supersede historical PRD examples where those differ from the implementation.

- Preserve the hidden project IDs and the indefinite Goodstuff lock in `src/data/projects.ts` unless the user asks to change availability.
- Prediction Market Chinese copy is still in progress. Do not fill its missing English translations yet; preserve the existing Chinese fallback.
- The home Hero uses the local WebGL2 implementation in `src/components/hero/`, not Unicorn Studio. Include its local images when committing or handing off changes.
- Case study Markdown in the parent directory is reference/draft material. Sync case study content only when explicitly requested; ordinary code or translation edits do not require rewriting those drafts.
- Update the handoff documents when changing startup instructions, architecture, availability, or verification status. Parent-directory reference documents are outside this Git repository.
