import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';
import { MapStackNavigator } from '@/features/map';
import { FeedStackNavigator } from '@/features/feed';
import { ProfileStackNavigator } from '@/features/profile';
import { Colors } from '../theme';

// ─── Types ───────────────────────────────────────────────────────────────────
export type AppTabParamList = {
  ExploreTab: undefined;
  FeedTab: undefined;
  AddTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  active: '#000000',
  inactive: '#767676',
  // addBg: '#E60023', // Pinterest red
  addBg: Colors.primary,
  addIcon: '#FFFFFF',
  barBg: '#FFFFFF',
  border: 'rgba(0,0,0,0.08)',
} as const;

// ─── SVG Icons ───────────────────────────────────────────────────────────────
// Each icon renders filled (active) or outlined (inactive) based on `filled` prop

function HomeIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <Path
          d="M10.707 2.293a1 1 0 011.586 0l7 7A1 1 0 0119 11v9a1 1 0 01-1 1h-4v-5H10v5H6a1 1 0 01-1-1v-9a1 1 0 01.293-.707l5.414-5.414z"
          fill={color}
        />
      ) : (
        <Path
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

function SearchIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={11}
        cy={11}
        r={7}
        stroke={color}
        strokeWidth={filled ? 2.5 : 1.8}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.12 : 0}
      />
      <Path
        d="M16.5 16.5L21 21"
        stroke={color}
        strokeWidth={filled ? 2.5 : 1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ChatIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <Path
          d="M2 5a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H7l-5 4V5z"
          fill={color}
        />
      ) : (
        <Path
          d="M2 5a2 2 0 012-2h16a2 2 0 012 2v11a2 2 0 01-2 2H7l-5 4V5z"
          stroke={color}
          strokeWidth={1.8}
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </Svg>
  );
}

function ProfileIcon({ filled, color }: { filled: boolean; color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <>
          <Circle cx={12} cy={8} r={4} fill={color} />
          <Path
            d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
          <Path
            d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
            stroke={color}
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
}

function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 4v14M4 11h14"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Tab config ──────────────────────────────────────────────────────────────
type TabConfig = {
  name: keyof AppTabParamList;
  icon: (props: { filled: boolean; color: string }) => React.ReactNode;
  isAdd?: boolean;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: 'ExploreTab',
    icon: (p) => <HomeIcon {...p} />,
  },
  {
    name: 'SearchTab',
    icon: (p) => <SearchIcon {...p} />,
  },
  {
    name: 'AddTab',
    isAdd: true,
    icon: () => <PlusIcon color={C.addIcon} />,
  },
  {
    name: 'FeedTab',
    icon: (p) => <ChatIcon {...p} />,
  },
  {
    name: 'ProfileTab',
    icon: (p) => <ProfileIcon {...p} />,
  },
];

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
const HIDE_TAB_ON = [
  'PlaceDetailScreen',
  'WriteReviewScreen',
  'DiscussionScreen',
  'AddPlaceScreen',
  'ListDetailScreen',
  'CreateListScreen',
  'UserProfileScreen',
];

function PinterestTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const activeRoute = state.routes[state.index];
  const focusedScreen = getFocusedRouteNameFromRoute(activeRoute);
  if (focusedScreen && HIDE_TAB_ON.includes(focusedScreen)) return null;

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
      ]}
    >
      {TAB_CONFIG.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const isFocused = state.index === routeIndex;

        const onPress = () => {
          if (tab.isAdd) {
            // Trigger add place — navigate to AddPlaceScreen as modal
            navigation.navigate('ExploreTab', {
              screen: 'AddPlaceScreen',
            } as never);
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[routeIndex]?.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        if (tab.isAdd) {
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.addBtn}
              activeOpacity={0.82}
              accessibilityRole="button"
              accessibilityLabel="Add place"
            >
              <View style={styles.addBtnInner}>
                {tab.icon({ filled: false, color: C.addIcon })}
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
          >
            {tab.icon({
              filled: isFocused,
              color: isFocused ? C.active : C.inactive,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: C.barBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.border,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    // iOS shadow subtle
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
    }),
  } as ViewStyle,

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minHeight: 44, // minimum tap target iOS HIG
  },

  addBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  addBtnInner: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.addBg,
    alignItems: 'center',
    justifyContent: 'center',
    // Pinterest-style subtle shadow on the red button
    ...Platform.select({
      ios: {
        shadowColor: C.addBg,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
    }),
  } as ViewStyle,
});

// ─── Navigator ────────────────────────────────────────────────────────────────
const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <PinterestTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="ExploreTab" component={MapStackNavigator} />
      <Tab.Screen name="FeedTab" component={FeedStackNavigator} />
      <Tab.Screen name="AddTab" component={MapStackNavigator} />
      {/* AddTab tabPress overridden — navigates to AddPlaceScreen modal */}
      <Tab.Screen name="SearchTab" component={MapStackNavigator} />
      {/* SearchTab — replace with SearchStackNavigator when built */}
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}