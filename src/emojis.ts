export type Emoji = string

export const getEmojis = (): Emoji[] => [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🥳',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁️',
  '😣',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🤯',
  '😳',
  '🥵',
  '🥶',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '🤗',
  '🤔',
  '🤭',
  '🤫',
  '🤥',
  // "😶", Skip for now, used as placeholder
  '😐',
  '😑',
  '😬',
  '🙄',
  '😯',
  '😦',
  '😧',
  '😮',
  '😲',
  '😴',
  '🤤',
  '😪',
  '😵',
  '🤐',
  '🥴',
  '🤢',
  '🤮',
  '🤧',
  '😷',
  '🤒',
  '🤕',
  '🤑',
  '🤠'
]

const getRandomIndex = <T>(arr: Array<T>) =>
  Math.floor(Math.random() * arr.length)

export const getRandomEmojis = (size: number): Set<Emoji> => {
  const available = getEmojis()
  const spliceRandomEmoji = (): Emoji =>
    available.splice(getRandomIndex(available), 1)[0]

  return Array(size)
    .fill(null)
    .reduce<Set<string>>(result => result.add(spliceRandomEmoji()), new Set())
}

export const getRandomEmojiPairs = (size: number): Emoji[] => {
  const emojis = Array.from(getRandomEmojis(size / 2))
  emojis.slice().forEach(emoji => {
    emojis.splice(getRandomIndex(emojis), 0, emoji)
  })
  return emojis
}
