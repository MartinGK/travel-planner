type Props = {
  items: string[];
  onClickItem: (value: string) => void;
};

export default function Dropdown({ items, onClickItem }: Props) {
  return (
    <div>
      <ul role="list" aria-label="dropdown">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => onClickItem(item)}
            className="hover:bg-purple"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
