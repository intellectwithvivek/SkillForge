import { Code, CopyButton } from '@the_viveksingh/vivek-ui'
import { SITE, VIVEKUI } from '@/lib/site'

/**
 * A shell command with a copy button that announces itself.
 *
 * Both of the site's takeaway commands go through this, so the markup, the
 * announcement and the copy affordance stay identical wherever they appear.
 */
function CommandLine({
  command,
  size = 'md',
  announcement,
}: {
  command: string
  size?: 'sm' | 'md'
  announcement: string
}) {
  return (
    <div className="sf-install">
      <Code size={size}>{command}</Code>
      <CopyButton
        value={command}
        variant="ghost"
        size="sm"
        label="Copy"
        copiedLabel="Copied"
        copiedAnnouncement={announcement}
      />
    </div>
  )
}

/** `npm i @the_viveksingh/vivek-ui` — the library this template exists to show off. */
export function InstallCommand({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <CommandLine
      command={VIVEKUI.install}
      size={size}
      announcement="Install command copied to clipboard"
    />
  )
}

/** `git clone …` — the fastest route from reading the site to running it. */
export function CloneCommand({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <CommandLine
      command={`git clone ${SITE.repo}.git`}
      size={size}
      announcement="Clone command copied to clipboard"
    />
  )
}
