"use client"

import { useEffect, useRef } from "react"

/**
 * Hook to handle scroll animations for elements with 'animate-on-scroll' class.
 * It uses IntersectionObserver and MutationObserver to handle dynamically added content.
 * @param {React.RefObject<HTMLElement>} containerRef A ref to the parent container to observe for DOM changes.
 * @returns {void}
 */
export const useScrollAnimation = (containerRef) => {
  const observerRef = useRef(null) // Stores the IntersectionObserver instance
  const observedElements = useRef(new Set()) // Keeps track of elements already observed

  useEffect(() => {
    if (!containerRef.current) return

    // Disconnect previous observer if it exists to prevent memory leaks
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            // Optional: Uncomment the line below if you want the animation to run only once
            // observer.unobserve(entry.target);
          }
        })
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px 0px -100px 0px", // Load elements 100px before they enter the viewport from the bottom
        threshold: 0, // Trigger as soon as any part of the element enters the viewport
      },
    )
    observerRef.current = observer

    // Function to find and observe all 'animate-on-scroll' elements
    const observeElements = () => {
      const elements = containerRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => {
        if (!observedElements.current.has(el)) {
          observer.observe(el)
          observedElements.current.add(el)

          // Immediately check if element is in viewport on mount and make it visible
          // This handles elements that are already visible when the page loads
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible")
          }
        }
      })
    }

    // Initial observation when the component mounts
    observeElements()

    // Set up MutationObserver to watch for new elements being added to the DOM
    // This is crucial for lazy-loaded components
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // If new nodes are added, re-observe to catch any new 'animate-on-scroll' elements
          observeElements()
        }
      })
    })

    // Start observing the container for child list changes (new elements added/removed)
    mutationObserver.observe(containerRef.current, { childList: true, subtree: true })

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect() // Disconnect IntersectionObserver
      }
      mutationObserver.disconnect() // Disconnect MutationObserver
      observedElements.current.clear() // Clear the set of observed elements
    }
  }, [containerRef]) // Re-run effect if the containerRef itself changes (unlikely for a fixed main element)
}
