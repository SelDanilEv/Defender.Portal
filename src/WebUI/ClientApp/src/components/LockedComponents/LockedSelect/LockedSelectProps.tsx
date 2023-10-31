import { KeyValue } from "src/models/key_value"

export default interface LockedSelectProps {
  isLoading?: boolean,
  options?: Array<KeyValue>,
  onSelect: (option: KeyValue) => any
  defaultKey?: string
}
