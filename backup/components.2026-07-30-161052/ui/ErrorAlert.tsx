type Props = {
  message?: any
  onRetry?: () => void
}

export function ErrorAlert({ message }: Props) {
  return <div>{String(message || "Error")}</div>
}