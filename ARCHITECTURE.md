## React Native Architecture

# Folder Structure (Feature-Based)

```
src/
├── app/
│   ├── _layout.tsx            # Root layout
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── _layout.tsx        # Tab navigator
│       ├── map.tsx            # Tab 1
│       ├── feed.tsx           # Tab 2
│       ├── add.tsx            # Tab 3 (+ button)
│       ├── search.tsx         # Tab 4
│       └── profile.tsx        # Tab 5
│
├── features/
│   ├── map/
│   │   ├── components/
│   │   │   ├── MapView.tsx
│   │   │   ├── PlacePin.tsx
│   │   │   └── PlaceBottomDrawer.tsx   # Reanimated bottom sheet
│   │   ├── hooks/
│   │   │   └── useNearbyPlaces.ts      # React Query
│   │   └── map.store.ts                # Zustand: selected pin, region
│   │
│   ├── place/
│   │   ├── components/
│   │   │   ├── PlaceDetailScreen.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewMediaGallery.tsx
│   │   │   └── AddPlaceSheet.tsx
│   │   ├── hooks/
│   │   │   ├── usePlaceDetail.ts
│   │   │   └── useAddPlace.ts
│   │   └── place.types.ts
│   │
│   ├── review/
│   │   ├── components/
│   │   │   ├── WriteReviewScreen.tsx
│   │   │   ├── MediaPicker.tsx         # Foto + video picker
│   │   │   ├── DiscussionScreen.tsx
│   │   │   └── CommentItem.tsx
│   │   ├── hooks/
│   │   │   ├── useReviews.ts
│   │   │   └── useComments.ts
│   │   └── review.types.ts
│   │
│   ├── feed/
│   │   ├── components/
│   │   │   ├── FeedScreen.tsx
│   │   │   └── FeedReviewCard.tsx      # FlashList item
│   │   └── hooks/
│   │       └── useFeed.ts              # Infinite query
│   │
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── ListCard.tsx
│   │   │   ├── SavedPlaceGrid.tsx
│   │   │   └── PhotoGrid.tsx
│   │   └── hooks/
│   │       ├── useProfile.ts
│   │       └── useLists.ts
│   │
│   └── auth/
│       ├── components/
│       │   ├── LoginScreen.tsx
│       │   └── RegisterScreen.tsx
│       ├── hooks/
│       │   └── useAuth.ts
│       └── auth.store.ts               # Zustand: user session
│
├── shared/
│   ├── api/
│   │   ├── client.ts                   # Axios instance + interceptor
│   │   └── endpoints.ts
│   ├── components/
│   │   ├── BottomSheet.tsx             # Reanimated generic sheet
│   │   ├── MediaViewer.tsx             # Full screen foto/video
│   │   ├── Avatar.tsx
│   │   ├── RatingStars.tsx
│   │   └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useLocation.ts              # Device GPS
│   │   └── useUpload.ts               # Upload ke R2 via presigned URL
│   └── constants/
│       ├── categories.ts
│       └── queryKeys.ts
│
└── store/
    └── auth.store.ts                   # Global auth state (Zustand)
```