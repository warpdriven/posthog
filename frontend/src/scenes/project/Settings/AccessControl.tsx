import { AvailableFeature } from '~/types'
import { organizationLogic } from '../../organizationLogic'
import { useActions, useValues } from 'kea'
import { RestrictedComponentProps } from 'lib/components/RestrictedArea'
import { sceneLogic } from '../../sceneLogic'
import { teamLogic } from 'scenes/teamLogic'
import { userLogic } from 'scenes/userLogic'
import { LemonSwitch } from '@posthog/lemon-ui'
import { IconLock, IconLockOpen } from 'lib/lemon-ui/icons'

export function AccessControl({ isRestricted }: RestrictedComponentProps): JSX.Element {
    const { currentOrganization, currentOrganizationLoading } = useValues(organizationLogic)
    const { currentTeam, currentTeamLoading } = useValues(teamLogic)
    const { updateCurrentTeam } = useActions(teamLogic)
    const { guardAvailableFeature } = useActions(sceneLogic)
    const { hasAvailableFeature } = useValues(userLogic)

    const projectPermissioningEnabled =
        hasAvailableFeature(AvailableFeature.PROJECT_BASED_PERMISSIONING) && currentTeam?.access_control

    return (
        <div>
            <h2 className="subtitle" id="access-control">
                Access Control
            </h2>
            <p>
                {projectPermissioningEnabled ? (
                    <>
                        This project is{' '}
                        <b>
                            <IconLock style={{ color: 'var(--warning)', marginRight: 5 }} />
                            private
                        </b>
                        . Only members listed below are allowed to access it.
                    </>
                ) : (
                    <>
                        This project is{' '}
                        <b>
                            <IconLockOpen style={{ marginRight: 5 }} />
                            open
                        </b>
                        . Any member of the organization can access it. To enable granular access control, make it
                        private.
                    </>
                )}
            </p>
            <LemonSwitch
                onChange={(checked) => {
                    guardAvailableFeature(
                        AvailableFeature.PROJECT_BASED_PERMISSIONING,
                        'project-based permissioning',
                        'Set permissions granularly for each project. Make sure only the right people have access to protected data.',
                        () => updateCurrentTeam({ access_control: checked })
                    )
                }}
                checked={!!projectPermissioningEnabled}
                disabled={
                    isRestricted ||
                    !currentOrganization ||
                    !currentTeam ||
                    currentOrganizationLoading ||
                    currentTeamLoading
                }
                bordered
                label="Make project private"
            />
        </div>
    )
}
