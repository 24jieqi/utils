export function downloadBlob(data: string, filename: string) {
  if (!data || typeof window === 'undefined') {
    return
  }
  const blob = new Blob([data])
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.style.display = 'none'
  link.download = filename
  document.body.append(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
