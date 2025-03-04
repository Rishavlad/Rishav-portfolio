# Background Video Guidelines

## Video Specifications

For optimal performance and visual appeal, your marketing agency background video should follow these specifications:

- **Duration**: 15-20 seconds
- **Resolution**: 1920x1080 (Full HD)
- **Format**: MP4
- **Codec**: H.264
- **Framerate**: 24-30 fps
- **Bitrate**: 2-4 Mbps (balance between quality and file size)
- **File Size**: Aim for under 5MB for optimal web performance

## Content Recommendations

Your video should include:
- Modern marketing-related scenes
- Team meetings
- Digital displays/screens
- Creative brainstorming sessions
- Data analytics visualizations
- Slow, smooth camera movements
- Subtle transitions between scenes

## Technical Considerations

- **No Audio**: The video will be muted by default
- **Looping**: Ensure the first and last frames blend seamlessly
- **Compression**: Use a tool like HandBrake to optimize file size
- **Mobile Compatibility**: Test on various devices and screen sizes
- **Fallback Image**: Always provide a static image fallback for browsers that don't support video

## Implementation

1. Place your video file in the `/public` directory
2. Update the `videoUrl` in `App.tsx` to point to your video file
3. Uncomment the `BackgroundVideo` component in `App.tsx`
4. Comment out the `BackgroundGrid` component if you want to use only the video background

## Resources for Creating Your Video

- Stock Video: Pexels, Pixabay, Videvo
- Video Editing: Adobe Premiere Pro, DaVinci Resolve, Filmora
- Compression: HandBrake, FFmpeg
- Testing: BrowserStack, CrossBrowserTesting