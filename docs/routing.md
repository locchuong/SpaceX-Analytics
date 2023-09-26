# Routing

This application uses File System routing done through the `/src/pages` directory. This is accomplish through a tiny library called **Generouted**, which generates file-based routes for Vite.

Learn more about [Generouted](https://github.com/oedotme/generouted)

## Conventions

### File and directories naming and conventions

- Routes declaration at `src/pages`
- Supports `.tsx` or `.jsx` extensions
- Optional `src/pages/_app.tsx` for an **app level layout**
- Optional `src/pages/404.tsx` for a **custom not-found page**

#### Index routes

- `src/pages/index.tsx` → `/`
- `src/pages/posts/index.tsx` → `/posts`

#### Nested routes

- `src/pages/posts/2022/index.tsx` → `/posts/2022`
- `src/pages/posts/2022/resolutions.tsx` → `/posts/2022/resolutions`

#### Dynamic routes

- `src/pages/posts/[slug].tsx` → `/posts/:slug`
- `src/pages/posts/[slug]/tags.tsx` → `/posts/:slug/tags`
- `src/pages/posts/[...all].tsx` → `/posts/*`

#### Nested layouts

- By defining `_layout.tsx` in any nested directory → `src/pages/posts/_layout.tsx`
- **Requires** using an `<Outlet />` component to render layout children
- All the files within the `src/pages/posts/` directory in this case, will be wrapped with that layout

#### Nested URLs without nested layouts

- Route file should be outside of the nested layout directory
- Include **dots** `.` between the segments to be converted to forward slashes
- `src/pages/posts.nested.as.url.not.layout.tsx` → `/posts/nested/as/url/not/layout`

#### Pathless layouts

- Similar to nested layouts for layout definition
- By wrapping the parent directory with **parentheses** `()`
- `src/pages/(auth)/_layout.tsx`
- `src/pages/(auth)/login.tsx` → `/login`
- Layout parent directory name is not included in the routes paths

#### Global modals

- By **prefixing** the file name with a **plus sign** `+` _(thinking the modal is an extra route overlaying the current route)_
- Modals navigation available via the `useModals()` hook
- `src/pages/+info.tsx` → `/info`
- `src/pages/+checkout/+details.tsx` → `/checkout/details`
- `src/pages/+checkout/+payment.tsx` → `/checkout/payment`

#### Optional segments

- By **prefixing** a route segment with a **minus sign** `-` _(thinking the segment can be subtracted or removed from the route path)_
- `src/pages/-en/about.tsx` → `/en?/about` → `/en/about`, `/about`
- `src/pages/-[lang]/about.tsx` → `/:lang?/about` → `/en/about`, `/fr/about`, `/about`

#### Ignored routes

- Any directory or file starts with an **underscore** `_` will be **ignored**
- `src/pages/_ignored.tsx`
- `src/pages/posts/_components/button.tsx`
- `src/pages/posts/_components/link.tsx`

