/*
Photo data organization

categoryDefinitions
  Defines the high-level gallery groups shown on Home and Gallery.
  id must match the folder name under public/photos.

collectionDefinitions
  Defines the curated collection cards shown on the Collections page.
  A collection receives its frames from photo.collections memberships below.

photos
  The single source of truth for the archive. Each photo object should follow:
  {
    id: "category-folder/file-name.jpg",          // stable unique id
    categoryId: "sea",                           // must match a categoryDefinitions id
    file: "file-name.jpg",                       // file name inside public/photos/categoryId
    image: "/photos/sea/file-name.jpg",          // public path used by React
    title: "Optional Display Title",             // optional; otherwise derived from file
    tone: "color" | "bw",                       // used by Gallery filters
    camera: "Olympus OM-1",                      // defaults are stored explicitly for clarity
    film: "Kodak Gold 200 ISO",
    location: "Poros, Argosaronikos, Greece",
    poem: ["Line one", "Line two"],              // optional; displayed in Gallery/Poetry/Viewer
    collections: [                               // optional memberships in curated collections
      { id: "poros-harbor", order: 0 }
    ]
  }

Derived exports
  photoCategories groups photos by categoryId for Home/Gallery.
  collections builds collection.frames from each photo's collections array.
  getPhotoByPath normalizes a public image path and returns display-ready photo metadata.
*/

const categoryDefinitions = [
  {
    "id": "sea",
    "label": "Sea",
    "homeDescription": "Salt, distance, silence, and the end of spring.",
    "galleryDescription": "Harbors, boats, coastlines, and open water."
  },
  {
    "id": "urban",
    "label": "Urban",
    "homeDescription": "Streets, corners, windows, and the loneliness of structure.",
    "galleryDescription": "Streets, balconies, platforms, walls, and town forms."
  },
  {
    "id": "Ancient Greece",
    "label": "Ancient Greece",
    "homeDescription": "Columns, ruins, temples, and the silence of old stone.",
    "galleryDescription": "Ancient forms, ruins, columns, and classical memory."
  },
  {
    "id": "flowers",
    "label": "Flowers",
    "homeDescription": "Colors that bleed life before they fall into memory.",
    "galleryDescription": "Blossoms, leaves, fruit, and small botanical scenes."
  },
  {
    "id": "animals",
    "label": "Animals",
    "homeDescription": "Quiet creatures, sudden encounters, and watchful forms.",
    "galleryDescription": "Quiet creatures, sudden encounters, and watchful forms."
  },
  {
    "id": "memory",
    "label": "Memory",
    "homeDescription": "Photographs about what leaves, remains, and returns.",
    "galleryDescription": "Images about what leaves, remains, and returns."
  },
  {
    "id": "faith",
    "label": "Faith",
    "homeDescription": "Crosses, domes, towers, and the hush around belief.",
    "galleryDescription": "Crosses, domes, towers, and the hush around belief."
  }
];

const collectionDefinitions = [
  {
    "id": "floral-observations",
    "title": "Floral Observations",
    "description": "Small blooms, bright fields, and the quiet language of spring.",
    "mood": "Botanical / Quiet"
  },
  {
    "id": "poros-harbor",
    "title": "Poros Island",
    "description": "Boats, ropes, water, and the old rhythm of departure.",
    "mood": "Sea / Place"
  },
  {
    "id": "faith-in-bw",
    "title": "Faith in B&W",
    "description": "Domes, crosses, towers, and belief held in monochrome silence.",
    "mood": "Faith / Monochrome"
  },
  {
    "id": "timeless-stones",
    "title": "Timeless Stones",
    "description": "Ancient columns, worn walls, and fragments of Athens held in black and white.",
    "mood": "Ancient / Memory"
  },
  {
    "id": "athens-by-rail",
    "title": "Athens by Rail",
    "description": "Stations, platforms, and passing trains through the pulse of the city.",
    "mood": "Urban / Transit"
  },
  {
    "id": "creatures-in-silence",
    "title": "Creatures in Silence",
    "description": "Watchful animals and brief encounters with living forms.",
    "mood": "Animals / Presence"
  }
];

export const photos = [
  {
    "id": "sea/anchored-boat-from-above.jpg",
    "categoryId": "sea",
    "file": "anchored-boat-from-above.jpg",
    "image": "/photos/sea/anchored-boat-from-above.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/boat-before-hills.jpg",
    "categoryId": "sea",
    "file": "boat-before-hills.jpg",
    "image": "/photos/sea/boat-before-hills.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/clustered-marina-masts.jpg",
    "categoryId": "sea",
    "file": "clustered-marina-masts.jpg",
    "image": "/photos/sea/clustered-marina-masts.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/cruise-ship-harbor-monochrome.jpg",
    "categoryId": "sea",
    "file": "cruise-ship-harbor-monochrome.jpg",
    "image": "/photos/sea/cruise-ship-harbor-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/fishing-boat-and-nets-monochrome.jpg",
    "categoryId": "sea",
    "file": "fishing-boat-and-nets-monochrome.jpg",
    "image": "/photos/sea/fishing-boat-and-nets-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/fishing-boat-greek-flag.jpg",
    "categoryId": "sea",
    "file": "fishing-boat-greek-flag.jpg",
    "image": "/photos/sea/fishing-boat-greek-flag.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "At the harbor's edge,",
      "There stands a little old cafe.",
      "Where sailors linger before they go.",
      "Bitter is the boats' call."
    ],
    "collections": [
      {
        "id": "poros-harbor",
        "order": 0
      }
    ]
  },
  {
    "id": "sea/fishing-nets-and-boat.jpg",
    "categoryId": "sea",
    "file": "fishing-nets-and-boat.jpg",
    "image": "/photos/sea/fishing-nets-and-boat.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/harbor-hillside-homes.jpg",
    "categoryId": "sea",
    "file": "harbor-hillside-homes.jpg",
    "image": "/photos/sea/harbor-hillside-homes.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/harbor-red-buoy.jpg",
    "categoryId": "sea",
    "file": "harbor-red-buoy.jpg",
    "image": "/photos/sea/harbor-red-buoy.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "The sea turns blue where blossoms fade,",
      "Spring leaves her crown upon the shore.",
      "The waves recall the paths she made,",
      "While summer knocks at every door."
    ],
    "collections": [
      {
        "id": "poros-harbor",
        "order": 1
      }
    ]
  },
  {
    "id": "sea/harbor-workboats-monochrome.jpg",
    "categoryId": "sea",
    "file": "harbor-workboats-monochrome.jpg",
    "image": "/photos/sea/harbor-workboats-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/island-horizon-clouds.jpg",
    "categoryId": "sea",
    "file": "island-horizon-clouds.jpg",
    "image": "/photos/sea/island-horizon-clouds.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/island-silhouettes-at-sea.jpg",
    "categoryId": "sea",
    "file": "island-silhouettes-at-sea.jpg",
    "image": "/photos/sea/island-silhouettes-at-sea.jpg",
    "title": "Wavebreaker",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/kalamatas-moody-day.png",
    "categoryId": "sea",
    "file": "kalamatas-moody-day.png",
    "image": "/photos/sea/kalamatas-moody-day.png",
    "title": "Kalamata's Moody Day",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/marina-masts.jpg",
    "categoryId": "sea",
    "file": "marina-masts.jpg",
    "image": "/photos/sea/marina-masts.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/marina-masts-hillside.jpg",
    "categoryId": "sea",
    "file": "marina-masts-hillside.jpg",
    "image": "/photos/sea/marina-masts-hillside.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/marina-masts-minimal.jpg",
    "categoryId": "sea",
    "file": "marina-masts-minimal.jpg",
    "image": "/photos/sea/marina-masts-minimal.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/marina-masts-reflection.jpg",
    "categoryId": "sea",
    "file": "marina-masts-reflection.jpg",
    "image": "/photos/sea/marina-masts-reflection.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/marina-rigging-clouds.jpg",
    "categoryId": "sea",
    "file": "marina-rigging-clouds.jpg",
    "image": "/photos/sea/marina-rigging-clouds.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/mantinia.jpg",
    "categoryId": "sea",
    "file": "mantinia.jpg",
    "image": "/photos/sea/mantinia.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/lock-hole.jpg",
    "categoryId": "sea",
    "file": "lock-hole.jpg",
    "image": "/photos/sea/lock-hole.jpg",
    "title": "Lock Hole",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "Through the lock hole I may look,",
      "Life is like some written book,",
      "Another's life, if one must see,",
      "He must unfold what others seek."
    ],
    "collections": [
      {
        "id": "poros-harbor",
        "order": 3
      }
    ]
  },
  {
    "id": "sea/misty-coastal-town.jpg",
    "categoryId": "sea",
    "file": "misty-coastal-town.jpg",
    "image": "/photos/sea/misty-coastal-town.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/narrow-canal-waterway.jpg",
    "categoryId": "sea",
    "file": "narrow-canal-waterway.jpg",
    "image": "/photos/sea/narrow-canal-waterway.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Corinthian Isthmus, Greece",
    "collections": []
  },
  {
    "id": "sea/open-water-monochrome.jpg",
    "categoryId": "sea",
    "file": "open-water-monochrome.jpg",
    "image": "/photos/sea/open-water-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/sailboat-bay.jpg",
    "categoryId": "sea",
    "file": "sailboat-bay.jpg",
    "image": "/photos/sea/sailboat-bay.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/sailboats-in-cove.jpg",
    "categoryId": "sea",
    "file": "sailboats-in-cove.jpg",
    "image": "/photos/sea/sailboats-in-cove.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/small-boat-before-waterfront.jpg",
    "categoryId": "sea",
    "file": "small-boat-before-waterfront.jpg",
    "image": "/photos/sea/small-boat-before-waterfront.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/speedboat-across-harbor.jpg",
    "categoryId": "sea",
    "file": "speedboat-across-harbor.jpg",
    "image": "/photos/sea/speedboat-across-harbor.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/storm-cloud-waterfront.jpg",
    "categoryId": "sea",
    "file": "storm-cloud-waterfront.jpg",
    "image": "/photos/sea/storm-cloud-waterfront.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/stormy-harbor-boats.jpg",
    "categoryId": "sea",
    "file": "stormy-harbor-boats.jpg",
    "image": "/photos/sea/stormy-harbor-boats.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/taygetus.png",
    "categoryId": "sea",
    "file": "taygetus.png",
    "image": "/photos/sea/taygetus.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/waterfront-town-mountains.jpg",
    "categoryId": "sea",
    "file": "waterfront-town-mountains.jpg",
    "image": "/photos/sea/waterfront-town-mountains.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/waterfront-town-panorama.jpg",
    "categoryId": "sea",
    "file": "waterfront-town-panorama.jpg",
    "image": "/photos/sea/waterfront-town-panorama.jpg",
    "title": "Poros Town Panorama",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": [
      {
        "id": "poros-harbor",
        "order": 4
      }
    ]
  },
  {
    "id": "sea/waterfront-town-under-clouds.jpg",
    "categoryId": "sea",
    "file": "waterfront-town-under-clouds.jpg",
    "image": "/photos/sea/waterfront-town-under-clouds.jpg",
    "title": "Kalamata Under Clouds",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/white-boat-on-bay.jpg",
    "categoryId": "sea",
    "file": "white-boat-on-bay.jpg",
    "image": "/photos/sea/white-boat-on-bay.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "sea/windy-harbor-promenade-monochrome.jpg",
    "categoryId": "sea",
    "file": "windy-harbor-promenade-monochrome.jpg",
    "image": "/photos/sea/windy-harbor-promenade-monochrome.jpg",
    "title": "Molos",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "sea/yachts-at-marina.jpg",
    "categoryId": "sea",
    "file": "yachts-at-marina.jpg",
    "image": "/photos/sea/yachts-at-marina.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/alley-to-the-harbor.jpg",
    "categoryId": "urban",
    "file": "alley-to-the-harbor.jpg",
    "image": "/photos/urban/alley-to-the-harbor.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/balconies-below-clocktower.jpg",
    "categoryId": "urban",
    "file": "balconies-below-clocktower.jpg",
    "image": "/photos/urban/balconies-below-clocktower.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/black-iron-balcony.jpg",
    "categoryId": "urban",
    "file": "black-iron-balcony.jpg",
    "image": "/photos/urban/black-iron-balcony.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/clock-tower-shopfront.jpg",
    "categoryId": "urban",
    "file": "clock-tower-shopfront.jpg",
    "image": "/photos/urban/clock-tower-shopfront.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/cream-balconies.jpg",
    "categoryId": "urban",
    "file": "cream-balconies.jpg",
    "image": "/photos/urban/cream-balconies.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/flowering-doorway.jpg",
    "categoryId": "urban",
    "file": "flowering-doorway.jpg",
    "image": "/photos/urban/flowering-doorway.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/graffiti-train-platform.jpg",
    "categoryId": "urban",
    "file": "graffiti-train-platform.jpg",
    "image": "/photos/urban/graffiti-train-platform.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 0
      }
    ]
  },
  {
    "id": "urban/green-shutters.jpg",
    "categoryId": "urban",
    "file": "green-shutters.jpg",
    "image": "/photos/urban/green-shutters.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/harbor-smokestack-monochrome.jpg",
    "categoryId": "urban",
    "file": "harbor-smokestack-monochrome.jpg",
    "image": "/photos/urban/harbor-smokestack-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "urban/harbor-street-red-vests.jpg",
    "categoryId": "urban",
    "file": "harbor-street-red-vests.jpg",
    "image": "/photos/urban/harbor-street-red-vests.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/hillside-homes-blue-door.jpg",
    "categoryId": "urban",
    "file": "hillside-homes-blue-door.jpg",
    "image": "/photos/urban/hillside-homes-blue-door.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/hillside-town-monochrome.jpg",
    "categoryId": "urban",
    "file": "hillside-town-monochrome.jpg",
    "image": "/photos/urban/hillside-town-monochrome.jpg",
    "title": "Poros' Curves",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": [
      {
        "id": "poros-harbor",
        "order": 5
      }
    ]
  },
  {
    "id": "urban/hillside-town-snow-peak.jpg",
    "categoryId": "urban",
    "file": "hillside-town-snow-peak.jpg",
    "image": "/photos/urban/hillside-town-snow-peak.jpg",
    "title": "Mount Lycabetus",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "urban/narrow-whitewashed-lane.jpg",
    "categoryId": "urban",
    "file": "narrow-whitewashed-lane.jpg",
    "image": "/photos/urban/narrow-whitewashed-lane.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/old-town-laneway.jpg",
    "categoryId": "urban",
    "file": "old-town-laneway.jpg",
    "image": "/photos/urban/old-town-laneway.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/parked-car-in-field-monochrome.jpg",
    "categoryId": "urban",
    "file": "parked-car-in-field-monochrome.jpg",
    "image": "/photos/urban/parked-car-in-field-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Greece",
    "collections": []
  },
  {
    "id": "urban/quiet-alley-walker.jpg",
    "categoryId": "urban",
    "file": "quiet-alley-walker.jpg",
    "image": "/photos/urban/quiet-alley-walker.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/rail-lines-between-buildings.jpg",
    "categoryId": "urban",
    "file": "rail-lines-between-buildings.jpg",
    "image": "/photos/urban/rail-lines-between-buildings.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 3
      }
    ]
  },
  {
    "id": "urban/single-cream-balcony.jpg",
    "categoryId": "urban",
    "file": "single-cream-balcony.jpg",
    "image": "/photos/urban/single-cream-balcony.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/stacked-town-houses.jpg",
    "categoryId": "urban",
    "file": "stacked-town-houses.jpg",
    "image": "/photos/urban/stacked-town-houses.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": [
      {
        "id": "poros-harbor",
        "order": 2
      }
    ]
  },
  {
    "id": "urban/train-arriving-platform.jpg",
    "categoryId": "urban",
    "file": "train-arriving-platform.jpg",
    "image": "/photos/urban/train-arriving-platform.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 2
      }
    ]
  },
  {
    "id": "urban/monastiraki.jpg",
    "categoryId": "urban",
    "file": "monastiraki.jpg",
    "image": "/photos/urban/monastiraki.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "urban/freedom-of-aristomenous.png",
    "categoryId": "urban",
    "file": "freedom-of-aristomenous.png",
    "image": "/photos/urban/freedom-of-aristomenous.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "urban/metroffiti.png",
    "categoryId": "urban",
    "file": "metroffiti.png",
    "image": "/photos/urban/metroffiti.png",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "urban/saint-eleutherios-station.png",
    "categoryId": "urban",
    "file": "saint-eleutherios-station.png",
    "image": "/photos/urban/saint-eleutherios-station.png",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 1
      }
    ]
  },
  {
    "id": "urban/the-dark-passenger.png",
    "categoryId": "urban",
    "file": "the-dark-passenger.png",
    "image": "/photos/urban/the-dark-passenger.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 4
      }
    ]
  },
  {
    "id": "urban/varvakios-market-door.jpg",
    "categoryId": "urban",
    "file": "varvakios-market-door.jpg",
    "image": "/photos/urban/varvakios-market-door.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "urban/wet-harbor-street.jpg",
    "categoryId": "urban",
    "file": "wet-harbor-street.jpg",
    "image": "/photos/urban/wet-harbor-street.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "urban/white-building-above-ruins.jpg",
    "categoryId": "urban",
    "file": "white-building-above-ruins.jpg",
    "image": "/photos/urban/white-building-above-ruins.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "urban/wooden-balcony-house.jpg",
    "categoryId": "urban",
    "file": "wooden-balcony-house.jpg",
    "image": "/photos/urban/wooden-balcony-house.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "Ancient Greece/acroscape.png",
    "categoryId": "Ancient Greece",
    "file": "acroscape.png",
    "image": "/photos/Ancient Greece/acroscape.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "Ancient Greece/ancient-roof.png",
    "categoryId": "Ancient Greece",
    "file": "ancient-roof.png",
    "image": "/photos/Ancient Greece/ancient-roof.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "Ancient Greece/ancient-stoa.png",
    "categoryId": "Ancient Greece",
    "file": "ancient-stoa.png",
    "image": "/photos/Ancient Greece/ancient-stoa.png",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "timeless-stones",
        "order": 0
      }
    ]
  },
  {
    "id": "Ancient Greece/athenean-agora.jpg",
    "categoryId": "Ancient Greece",
    "file": "athenean-agora.jpg",
    "image": "/photos/Ancient Greece/athenean-agora.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "Ancient Greece/attalos-balcony.png",
    "categoryId": "Ancient Greece",
    "file": "attalos-balcony.png",
    "image": "/photos/Ancient Greece/attalos-balcony.png",
    "title": "Attalos' Balcony",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "timeless-stones",
        "order": 1
      }
    ]
  },
  {
    "id": "Ancient Greece/column-capital-monochrome.jpg",
    "categoryId": "Ancient Greece",
    "file": "column-capital-monochrome.jpg",
    "image": "/photos/Ancient Greece/column-capital-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "timeless-stones",
        "order": 2
      }
    ]
  },
  {
    "id": "Ancient Greece/church-cross-and-clouds.jpg",
    "categoryId": "Ancient Greece",
    "file": "church-cross-and-clouds.jpg",
    "image": "/photos/Ancient Greece/church-cross-and-clouds.jpg",
    "title": "The Old Mosque",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "timeless-stones",
        "order": 3
      }
    ]
  },
  {
    "id": "Ancient Greece/church-wall-and-cypress.jpg",
    "categoryId": "Ancient Greece",
    "file": "church-wall-and-cypress.jpg",
    "image": "/photos/Ancient Greece/church-wall-and-cypress.jpg",
    "title": "Temple of Poseidon",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "timeless-stones",
        "order": 4
      }
    ]
  },
  {
    "id": "Ancient Greece/family-on-tour.jpg",
    "categoryId": "Ancient Greece",
    "file": "family-on-tour.jpg",
    "image": "/photos/Ancient Greece/family-on-tour.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "Ancient Greece/metro-of-time.jpg",
    "categoryId": "Ancient Greece",
    "file": "metro-of-time.jpg",
    "image": "/photos/Ancient Greece/metro-of-time.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Athens, Greece",
    "collections": [
      {
        "id": "athens-by-rail",
        "order": 5
      }
    ]
  },
  {
    "id": "Ancient Greece/night-in-agora.png",
    "categoryId": "Ancient Greece",
    "file": "night-in-agora.png",
    "image": "/photos/Ancient Greece/night-in-agora.png",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/daisy-meadow.jpg",
    "categoryId": "flowers",
    "file": "daisy-meadow.jpg",
    "image": "/photos/flowers/daisy-meadow.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/holly-berries.jpg",
    "categoryId": "flowers",
    "file": "holly-berries.jpg",
    "image": "/photos/flowers/holly-berries.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/ivy-on-tree-trunk.jpg",
    "categoryId": "flowers",
    "file": "ivy-on-tree-trunk.jpg",
    "image": "/photos/flowers/ivy-on-tree-trunk.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/orange-tree-fruit.jpg",
    "categoryId": "flowers",
    "file": "orange-tree-fruit.jpg",
    "image": "/photos/flowers/orange-tree-fruit.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/pale-pink-daisies.jpg",
    "categoryId": "flowers",
    "file": "pale-pink-daisies.jpg",
    "image": "/photos/flowers/pale-pink-daisies.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "Beside the creek the daisies bloom,",
      "Through valleys green in tender gloom,",
      "Soft light descends beneath the trees,",
      "Where children once would fall asleep."
    ],
    "collections": [
      {
        "id": "floral-observations",
        "order": 0
      }
    ]
  },
  {
    "id": "flowers/pink-wildflowers.jpg",
    "categoryId": "flowers",
    "file": "pink-wildflowers.jpg",
    "image": "/photos/flowers/pink-wildflowers.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/weeping-bells.jpg",
    "categoryId": "flowers",
    "file": "weeping-bells.jpg",
    "image": "/photos/flowers/weeping-bells.jpg",
    "title": "Weeping Bells",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "Beneath the boughs where soft blooms sway,",
      "The old days breathe in light of May.",
      "And through the hush of leaf and flower,",
      "Spring keeps the memory of every hour."
    ],
    "collections": [
      {
        "id": "floral-observations",
        "order": 1
      }
    ]
  },
  {
    "id": "flowers/plant-in-glass-jar.jpg",
    "categoryId": "flowers",
    "file": "plant-in-glass-jar.jpg",
    "image": "/photos/flowers/plant-in-glass-jar.jpg",
    "title": "Shrimp Jar",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Greece",
    "collections": []
  },
  {
    "id": "flowers/poppy-field.jpg",
    "categoryId": "flowers",
    "file": "poppy-field.jpg",
    "image": "/photos/flowers/poppy-field.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "A spark was lit on Spring's grassy bed,",
      "Woven of green, it softly spread."
    ],
    "collections": [
      {
        "id": "floral-observations",
        "order": 3
      }
    ]
  },
  {
    "id": "flowers/redbud-blossoms.jpg",
    "categoryId": "flowers",
    "file": "redbud-blossoms.jpg",
    "image": "/photos/flowers/redbud-blossoms.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/green-of-a-fence.jpg",
    "categoryId": "flowers",
    "file": "green-of-a-fence.jpg",
    "image": "/photos/flowers/green-of-a-fence.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "flowers/red-maple-sapling.jpg",
    "categoryId": "flowers",
    "file": "red-maple-sapling.jpg",
    "image": "/photos/flowers/red-maple-sapling.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/roses-on-stone-pillar.jpg",
    "categoryId": "flowers",
    "file": "roses-on-stone-pillar.jpg",
    "image": "/photos/flowers/roses-on-stone-pillar.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "In gardens old where colors bleed,",
      "Life blooms from every buried seed.",
      "Through petal, vine, and scented air,",
      "The ancient world still lingers there"
    ],
    "collections": []
  },
  {
    "id": "flowers/white-blossoms-in-shadow.jpg",
    "categoryId": "flowers",
    "file": "white-blossoms-in-shadow.jpg",
    "image": "/photos/flowers/white-blossoms-in-shadow.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "flowers/white-blossom-sprays.jpg",
    "categoryId": "flowers",
    "file": "white-blossom-sprays.jpg",
    "image": "/photos/flowers/white-blossom-sprays.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "When morning dew on flowers forms,",
      "As summer nears through gentle dawns,",
      "And warmth is drawn from golden sun,",
      "Like distant dreams when Spring was done."
    ],
    "collections": [
      {
        "id": "floral-observations",
        "order": 2
      }
    ]
  },
  {
    "id": "flowers/white-flowering-branches.jpg",
    "categoryId": "flowers",
    "file": "white-flowering-branches.jpg",
    "image": "/photos/flowers/white-flowering-branches.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/white-pelargoniums-monochrome.jpg",
    "categoryId": "flowers",
    "file": "white-pelargoniums-monochrome.jpg",
    "image": "/photos/flowers/white-pelargoniums-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Greece",
    "collections": []
  },
  {
    "id": "flowers/white-snapdragons.jpg",
    "categoryId": "flowers",
    "file": "white-snapdragons.jpg",
    "image": "/photos/flowers/white-snapdragons.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "flowers/yellow-daisy-bush.jpg",
    "categoryId": "flowers",
    "file": "yellow-daisy-bush.jpg",
    "image": "/photos/flowers/yellow-daisy-bush.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "animals/bird-upon-a-tree.jpg",
    "categoryId": "animals",
    "file": "bird-upon-a-tree.jpg",
    "image": "/photos/animals/bird-upon-a-tree.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "poem": [
      "A bird alights upon the tree,",
      "And pours his song through leaf and breeze.",
      "A trembling hymn the morning brings,",
      "To stir the heart his longing seeks."
    ],
    "collections": [
      {
        "id": "creatures-in-silence",
        "order": 3
      }
    ]
  },
  {
    "id": "animals/the-ominous-cat.jpg",
    "categoryId": "animals",
    "file": "the-ominous-cat.jpg",
    "image": "/photos/animals/the-ominous-cat.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "A shadow moved where no one sat,",
      "The old town sent its ominous cat.",
      "No voice, no step, nor tweet of bird,",
      "The cat was gone back to her lair."
    ],
    "collections": [
      {
        "id": "creatures-in-silence",
        "order": 0
      }
    ]
  },
  {
    "id": "animals/dried-reeds-and-stones.jpg",
    "categoryId": "animals",
    "file": "dried-reeds-and-stones.jpg",
    "image": "/photos/animals/dried-reeds-and-stones.jpg",
    "title": "Dried Reeds And Living Stones",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/duck-in-sunlight.jpg",
    "categoryId": "animals",
    "file": "duck-in-sunlight.jpg",
    "image": "/photos/animals/duck-in-sunlight.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": [
      {
        "id": "creatures-in-silence",
        "order": 2
      }
    ]
  },
  {
    "id": "animals/flamingos-in-green-water.jpg",
    "categoryId": "animals",
    "file": "flamingos-in-green-water.jpg",
    "image": "/photos/animals/flamingos-in-green-water.jpg",
    "title": "The Chosen",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/flamingos-resting.jpg",
    "categoryId": "animals",
    "file": "flamingos-resting.jpg",
    "image": "/photos/animals/flamingos-resting.jpg",
    "title": "Spoonbills Moving",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/lion-resting-in-shade.jpg",
    "categoryId": "animals",
    "file": "lion-resting-in-shade.jpg",
    "image": "/photos/animals/lion-resting-in-shade.jpg",
    "title": "Bear Minimum",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/monkey-in-grass.jpg",
    "categoryId": "animals",
    "file": "monkey-in-grass.jpg",
    "image": "/photos/animals/monkey-in-grass.jpg",
    "title": "Chimp Walk",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/red-ibis-on-rock.jpg",
    "categoryId": "animals",
    "file": "red-ibis-on-rock.jpg",
    "image": "/photos/animals/red-ibis-on-rock.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/scarlet-ibis-near-water.jpg",
    "categoryId": "animals",
    "file": "scarlet-ibis-near-water.jpg",
    "image": "/photos/animals/scarlet-ibis-near-water.jpg",
    "title": "Roseate Spoonbill",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/seated-figure-garden-wall.jpg",
    "categoryId": "animals",
    "file": "seated-figure-garden-wall.jpg",
    "image": "/photos/animals/seated-figure-garden-wall.jpg",
    "title": "Thinking Gibbon",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": [
      {
        "id": "creatures-in-silence",
        "order": 4
      }
    ]
  },
  {
    "id": "animals/spoonbills-on-branch.jpg",
    "categoryId": "animals",
    "file": "spoonbills-on-branch.jpg",
    "image": "/photos/animals/spoonbills-on-branch.jpg",
    "title": "Spoonbill Trio",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "animals/tall-and-proud.jpg",
    "categoryId": "animals",
    "file": "tall-and-proud.jpg",
    "image": "/photos/animals/tall-and-proud.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "animals/tortoise-in-grass.jpg",
    "categoryId": "animals",
    "file": "tortoise-in-grass.jpg",
    "image": "/photos/animals/tortoise-in-grass.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": [
      {
        "id": "creatures-in-silence",
        "order": 1
      }
    ]
  },
  {
    "id": "animals/turtle-on-log.jpg",
    "categoryId": "animals",
    "file": "turtle-on-log.jpg",
    "image": "/photos/animals/turtle-on-log.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Attica Zoological Park, Spata, Greece",
    "collections": []
  },
  {
    "id": "memory/bright-cloud-study.jpg",
    "categoryId": "memory",
    "file": "bright-cloud-study.jpg",
    "image": "/photos/memory/bright-cloud-study.jpg",
    "title": "Piece of Heaven",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "memory/cloud-over-dark-mountain.jpg",
    "categoryId": "memory",
    "file": "cloud-over-dark-mountain.jpg",
    "image": "/photos/memory/cloud-over-dark-mountain.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "memory/empty-frame-by-water.jpg",
    "categoryId": "memory",
    "file": "empty-frame-by-water.jpg",
    "image": "/photos/memory/empty-frame-by-water.jpg",
    "title": "Door to the Sea",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "memory/children-and-dreams.jpg",
    "categoryId": "memory",
    "file": "children-and-dreams.jpg",
    "image": "/photos/memory/children-and-dreams.jpg",
    "title": "Children and Dreams",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "The fields of old have seen much warmth,",
      "The Spring returns beneath new sun,",
      "Old dreams may fade and new be born,",
      "Yet still we sing our once-sung song."
    ],
    "collections": []
  },
  {
    "id": "memory/fountain-square-monochrome.jpg",
    "categoryId": "memory",
    "file": "fountain-square-monochrome.jpg",
    "image": "/photos/memory/fountain-square-monochrome.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "memory/the-land-of-olives.jpg",
    "categoryId": "memory",
    "file": "the-land-of-olives.jpg",
    "image": "/photos/memory/the-land-of-olives.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "memory/lone-walker-on-pier.jpg",
    "categoryId": "memory",
    "file": "lone-walker-on-pier.jpg",
    "image": "/photos/memory/lone-walker-on-pier.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "memory/shadowed-garden-trees.jpg",
    "categoryId": "memory",
    "file": "shadowed-garden-trees.jpg",
    "image": "/photos/memory/shadowed-garden-trees.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "memory/sunlit-tree-branch.jpg",
    "categoryId": "memory",
    "file": "sunlit-tree-branch.jpg",
    "image": "/photos/memory/sunlit-tree-branch.jpg",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Diomidous Botanical Garden, Athens, Greece",
    "collections": []
  },
  {
    "id": "memory/windswept-tree-by-sea.jpg",
    "categoryId": "memory",
    "file": "windswept-tree-by-sea.jpg",
    "image": "/photos/memory/windswept-tree-by-sea.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": []
  },
  {
    "id": "faith/ypapanti.jpg",
    "categoryId": "faith",
    "file": "ypapanti.jpg",
    "image": "/photos/faith/ypapanti.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "poem": [
      "Faith is the door to mysteries,",
      "Walked with wonder on bent knees.",
      "Not seeking crowns nor victories,",
      "Only the grace that softly frees."
    ],
    "collections": [
      {
        "id": "faith-in-bw",
        "order": 3
      }
    ]
  },
  {
    "id": "faith/church-domes-monochrome.jpg",
    "categoryId": "faith",
    "file": "church-domes-monochrome.jpg",
    "image": "/photos/faith/church-domes-monochrome.jpg",
    "title": "Holly Apostoles",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": [
      {
        "id": "faith-in-bw",
        "order": 0
      }
    ]
  },
  {
    "id": "faith/ypapanti-of-kalamata.jpg",
    "categoryId": "faith",
    "file": "ypapanti-of-kalamata.jpg",
    "image": "/photos/faith/ypapanti-of-kalamata.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford HP5 400 ISO",
    "location": "Kalamata, Messinia, Greece",
    "collections": [
      {
        "id": "faith-in-bw",
        "order": 1
      }
    ]
  },
  {
    "id": "faith/sailors-church.jpg",
    "categoryId": "faith",
    "file": "sailors-church.jpg",
    "image": "/photos/faith/sailors-church.jpg",
    "title": "Sailor's Church",
    "tone": "color",
    "camera": "Olympus OM-1",
    "film": "Kodak Gold 200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "Beneath the cross where sea winds blow,",
      "Brave sailors face the ocean's roar.",
      "They make merry where'er they roam,",
      "To find a harbor to call their own."
    ],
    "collections": []
  },
  {
    "id": "faith/clock-tower-closeup.jpg",
    "categoryId": "faith",
    "file": "clock-tower-closeup.jpg",
    "image": "/photos/faith/clock-tower-closeup.jpg",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "collections": []
  },
  {
    "id": "faith/stone-cross-rooftop.jpg",
    "categoryId": "faith",
    "file": "stone-cross-rooftop.jpg",
    "image": "/photos/faith/stone-cross-rooftop.jpg",
    "title": "Symbol of Faith",
    "tone": "bw",
    "camera": "Olympus OM-1",
    "film": "Ilford Delta 3200 ISO",
    "location": "Poros, Argosaronikos, Greece",
    "poem": [
      "The Cross stands still where roads divide,",
      "And faith walks on, a silent guide.",
      "Through dust and years and changing tide,",
      "It keeps the heart from turning aside."
    ],
    "collections": [
      {
        "id": "faith-in-bw",
        "order": 2
      }
    ]
  }
];

export const getPhotoTitle = (fileName) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const photosByImage = new Map(photos.map((photo) => [photo.image, photo]));

export const getPhotoPath = (categoryId, fileName) =>
  "/photos/" + categoryId + "/" + fileName;

const getPhotoDisplayTitle = (photo) => photo.title ?? getPhotoTitle(photo.file);

export const photoCategories = categoryDefinitions.map((category) => ({
  ...category,
  photos: photos.filter((photo) => photo.categoryId === category.id),
}));

const getCollectionOrder = (photo, collectionId) =>
  photo.collections.find((collection) => collection.id === collectionId)?.order ?? 0;

export const collections = collectionDefinitions.map((collection) => ({
  ...collection,
  frames: photos
    .filter((photo) =>
      photo.collections.some((membership) => membership.id === collection.id),
    )
    .sort(
      (firstPhoto, secondPhoto) =>
        getCollectionOrder(firstPhoto, collection.id) -
        getCollectionOrder(secondPhoto, collection.id),
    ),
}));

export const getCategoryById = (categoryId) =>
  photoCategories.find((category) => category.id === categoryId);

export const getPhotoByPath = (imagePath) => {
  const normalizedPath = imagePath.startsWith("/photos/")
    ? imagePath
    : "/photos/" + imagePath.replace(/^photos\//, "");
  const photo = photosByImage.get(normalizedPath);

  if (!photo) {
    return null;
  }

  const category = getCategoryById(photo.categoryId);

  return {
    ...photo,
    title: getPhotoDisplayTitle(photo),
    categoryLabel: category?.label,
  };
};

export const getFilteredPhotos = (category, toneFilter) => {
  if (toneFilter === "all") {
    return category.photos;
  }

  return category.photos.filter((photo) => photo.tone === toneFilter);
};
