# Utilities

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Utilities](#utilities)
    - [twMerge and clsx](#twmerge-and-clsx)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Useful utilities for working with Tailwind.

## twMerge and clsx

Use this combination of libraries to make it easier to manage conflicting styles.

[Why you should use twMerge and clsx for Tailwind](https://www.youtube.com/watch?v=re2JFITR7TI)

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...args: ClassValue[]): string {
  return twMerge(clsx(args))
}
```
