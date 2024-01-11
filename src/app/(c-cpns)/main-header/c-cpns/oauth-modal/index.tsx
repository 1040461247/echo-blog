// Types
export interface IProps {
  children?: React.ReactElement
  isOpen: boolean
  handleModal: (isOpen: boolean) => void
}

const OauthModal: FC<IProps> = memo(({ isOpen, handleModal }) => {})

export default OauthModal
OauthModal.displayName = 'OauthModal'
