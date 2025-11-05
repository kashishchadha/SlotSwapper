import { useEffect, useRef } from 'react'

const useNotificationSound = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    // Create audio element for notification sound
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUKjo8LZjHAU5k9r0zn0uBSd5y/DckjsKE1+46+uoVRQKRp/g8r5sIQUsgs/y2Yk2CBtpvfDknE4MDlCo6PC2YxwFOZPa9M59LgUnesvw3JI7ChNfuOvrqFUUCkaf4PK+bCEFLILP8tmJNggbab3w5JxODA5QqOjwtmMcBTmT2vTOfS4FJ3rL8NySOwsTX7jr66hVFApGn+DyvmwhBSyCz/LZiTYIG2m98OScTgwOUKjo8LZjHAU5k9r0zn0uBSd6y/DckjsKE1+46+uoVRQKRp/g8r5sIQUsgs/y2Yk2CBtpvfDknE4MDlCo6PC2YxwFOZPa9M59LgUneSvw3JI7ChNfuOvrqFUUCkaf4PK+bCEFLILP8tmJNggbab3w5JxODA5QqOjwtmMcBTmT2vTOfS4FJ3rL8NySOwsTX7jr66hVFApGn+DyvmwhBSyCz/LZiTYIG2m98OScTgwOUKjo8LZjHAU5k9r0zn0uBSd6y/DckjsKE1+46+uoVRQKRp/g8r5sIQUsgs/y2Yk2CBtpvfDknE4MDlCo6PC2YxwFOZPa9M59LgUneSvw3JI7ChNfuOvrqFUUCkaf4PK+bCEFLILP8tmJNggbab3w5JxODA5QqOjwtmMcBTmT2vTOfS4FJ3rL8NySOwsTX7jr66hVFApGn+DyvmwhBSyCz/LZiTYIG2m98OScTgwOUKjo8LZjHAU5k9r0zn0uBSd6y/DckjsKE1+46+uoVRQK')
    audioRef.current.volume = 0.3
  }, [])

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err)
      })
    }
  }

  return playNotificationSound
}

export default useNotificationSound
