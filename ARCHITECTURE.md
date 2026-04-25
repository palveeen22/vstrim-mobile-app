## React Native Architecture

# Folder Structure (Feature-Based)

```
src/
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── auth.api.ts          # Semua API call terkait auth
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts           # useLogin, useRegister, useLogout
│   │   ├── screens/
│   │   │   ├── AuthScreen.tsx
│   │   │   ├── SetupProfileScreen.tsx
│   │   │   └── OtpScreen.tsx
│   │   ├── store/
│   │   │   └── auth.store.ts        # Zustand: user, token
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts                 # Public API fitur ini
│   │
│   ├── map/
│   │   ├── api/
│   │   │   └── map.api.ts           # getNearbyPlaces
│   │   ├── components/
│   │   │   ├── PlacePin.tsx         # Custom map marker
│   │   │   ├── PlaceBottomDrawer.tsx  # Reanimated bottom sheet
│   │   │   └── CategoryFilter.tsx   # Horizontal filter chips
│   │   ├── hooks/
│   │   │   ├── useNearbyPlaces.ts   # React Query: places in radius
│   │   │   └── useUserLocation.ts   # GPS hook
│   │   ├── screens/
│   │   │   └── MapScreen.tsx
│   │   ├── store/
│   │   │   └── map.store.ts         # Zustand: selectedPin, region, activeCategory
│   │   ├── types/
│   │   │   └── map.types.ts
│   │   └── index.ts
│   │
│   ├── place/
│   │   ├── api/
│   │   │   └── place.api.ts         # getPlace, createPlace, savePlace
│   │   ├── components/
│   │   │   ├── PlaceHeader.tsx      # Hero + info
│   │   │   ├── ReviewCard.tsx       # Card di list review
│   │   │   ├── ReviewMediaRow.tsx   # Foto/video preview strip
│   │   │   └── PlaceRatingSummary.tsx
│   │   ├── hooks/
│   │   │   ├── usePlaceDetail.ts
│   │   │   ├── usePlaceReviews.ts
│   │   │   └── useSavePlace.ts      # Optimistic update
│   │   ├── screens/
│   │   │   ├── PlaceDetailScreen.tsx
│   │   │   └── AddPlaceScreen.tsx
│   │   ├── types/
│   │   │   └── place.types.ts
│   │   └── index.ts
│   │
│   ├── review/
│   │   ├── api/
│   │   │   └── review.api.ts     # createReview, voteHelpful, reportReview
│   │   ├── components/
│   │   │   ├── MediaPicker.tsx      # Foto + video picker
│   │   │   ├── MediaUploadGrid.tsx  # Preview sebelum submit
│   │   │   ├── RatingInput.tsx      # Star rating interaktif
│   │   │   ├── CommentItem.tsx
│   │   │   └── CommentInput.tsx     # Input + attach foto
│   │   ├── hooks/
│   │   │   ├── useWriteReview.ts  # Upload flow: presign → upload R2 → confirm
│   │   │   ├── useComments.ts
│   │   │   └── useHelpfulVote.ts    # Optimistic update
│   │   ├── screens/
│   │   │   ├── WriteReviewScreen.tsx
│   │   │   └── DiscussionScreen.tsx
│   │   ├── types/
│   │   │   └── review.types.ts
│   │   └── index.ts
│   │
│   ├── feed/
│   │   ├── api/
│   │   │   └── feed.api.ts
│   │   ├── components/
│   │   │   └── FeedReviewCard.tsx   # FlashList item — foto/video + info
│   │   ├── hooks/
│   │   │   └── useFeed.ts           # useInfiniteQuery
│   │   ├── screens/
│   │   │   └── FeedScreen.tsx
│   │   ├── types/
│   │   │   └── feed.types.ts
│   │   └── index.ts
│   │
│   ├── profile/
│   │   ├── api/
│   │   │   └── profile.api.ts       # getProfile, updateProfile, follow
│   │   ├── components/
│   │   │   ├── ProfileHeader.tsx    # Avatar, stats, follow button
│   │   │   ├── StatsRow.tsx         # Places / Followers / Following / Reviews
│   │   │   ├── ListCard.tsx         # Card koleksi tempat
│   │   │   ├── SavedPlaceGrid.tsx   # 2-col grid saved places
│   │   │   └── PhotoGrid.tsx        # 2-col grid foto dari semua review
│   │   ├── hooks/
│   │   │   ├── useProfile.ts
│   │   │   ├── useFollow.ts         # Optimistic update
│   │   │   └── useLists.ts
│   │   ├── screens/
│   │   │   ├── ProfileScreen.tsx    # Own profile
│   │   │   ├── UserProfileScreen.tsx  # Other user's profile
│   │   │   └── ListDetailScreen.tsx
│   │   ├── types/
│   │   │   └── profile.types.ts
│   │   └── index.ts
│   │
│   └── lists/
│       ├── api/
│       │   └── lists.api.ts         # createList, addItem, saveList
│       ├── components/
│       │   └── AddToListSheet.tsx   # Bottom sheet pilih list
│       ├── hooks/
│       │   └── useMyLists.ts
│       ├── screens/
│       │   └── CreateListScreen.tsx
│       ├── types/
│       │   └── lists.types.ts
│       └── index.ts
│
├── shared/
│   ├── api/
│   │   ├── client.ts       # Axios instance + interceptor (token inject + refresh)
│   │   ├── queryKeys.ts    # Centralized query key factory
│   │   └── types.ts        # ApiResponse<T>, PaginatedResponse<T>
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Divider.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── RatingStars.tsx      # Display only
│   │   │   └── SkeletonLoader.tsx
│   │   ├── BottomSheet.tsx          # Generic Reanimated bottom sheet
│   │   ├── MediaViewer.tsx          # Full screen foto/video modal
│   │   └── KeyboardAwareView.tsx
│   │
│   ├── hooks/
│   │   ├── useUpload.ts             # Presigned URL → upload R2 → confirm
│   │   ├── useDebounce.ts
│   │   └── useAppState.ts           # Foreground/background detection
│   │
│   ├── constants/
│   │   ├── categories.ts            # ['cafe', 'bar', 'restaurant', ...]
│   │   ├── queryKeys.ts
│   │   └── config.ts                # API_URL, R2_URL
│   │
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   └── utils/
│       ├── formatDistance.ts        # "1.2 км"
│       ├── formatDate.ts            # "2 дня назад"
│       └── formatCount.ts           # "1.2k"
│
└── navigation/
    ├── RootNavigator.tsx            # Auth check → AuthStack | AppTabs
    ├── AuthStackNavigator.tsx       # Login, Register
    ├── AppTabNavigator.tsx          # 5 tabs
    ├── MapStackNavigator.tsx        # Map → PlaceDetail → WriteReview → Discussion
    ├── FeedStackNavigator.tsx       # Feed → PlaceDetail → ...
    ├── ProfileStackNavigator.tsx    # Profile → UserProfile → ListDetail → ...
    ├── types.ts                     # RootStackParamList, TabParamList, dll
    └── index.ts
```