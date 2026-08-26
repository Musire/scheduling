'use client'

import ScrollableContainer from "./ScrollableContainer"
import SelectableCard from "./SelectableCard"

type SelectableListProps<T, K extends string | null> = {
  items: T[]
  selected: K | undefined
  onSelect: (v: K) => void
  getId: (item: T) => K
  renderItem: (item: T) => React.ReactNode
  scrollable?: boolean
}

export default function SelectableList<T, K extends string | null>({
  items,
  selected,
  onSelect,
  getId,
  renderItem,
  scrollable
}: SelectableListProps<T, K>) {

  const list = items.map(item => {
    const id = getId(item)

    return (
      <SelectableCard
        key={id}
        selected={selected === id}
        onSelect={() => onSelect(id)}
      >
        {renderItem(item)}
      </SelectableCard>
    )
  })

  return (
    <div>
      {scrollable ? (
        <ScrollableContainer>
          {list}
        </ScrollableContainer>
      ) : (
        <ul className="flex flex-col space-y-4">
          {list}
        </ul>
      )}
    </div>
  )
}