export function getThumbnailUrl(postId: string) {
  const thumbnails = [
    "1.png", "2.png", "3.png", "4.png", "5.png", 
    "6.png", "7.png", "8.png", "9.png", "10.png", 
    "11.png", "12.png", "13.png", "chatgpt.png"
  ];
  
  // Create a numeric hash from the post ID
  let hash = 0;
  for (let i = 0; i < postId.length; i++) {
    hash = postId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Ensure positive index
  const index = Math.abs(hash) % thumbnails.length;
  return `/thumbnail/${thumbnails[index]}`;
}
