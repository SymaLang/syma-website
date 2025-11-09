# Syma Primitives Cheat Sheet

This document lists all available primitive operations in the Syma language runtime.

## Arithmetic Operations

| Primitive | Aliases | Signature | Returns | Notes |
|-----------|---------|-----------|---------|-------|
| `Add` | `+` | `[Num, Num]` | `Num` | Sum of two numbers |
| `Sub` | `-` | `[Num, Num]` | `Num` | Difference of two numbers |
| `Mul` | `*` | `[Num, Num]` | `Num` | Product of two numbers |
| `Div` | `/` | `[Num, Num]` | `Num` | Quotient (returns null for division by zero) |
| `Mod` | `%` | `[Num, Num]` | `Num` | Remainder (returns null for modulo by zero) |
| `Pow` | `^` | `[Num, Num]` | `Num` | Exponentiation (a^b) |
| `Sqrt` | - | `[Num]` | `Num` | Square root (returns null for negative numbers) |
| `Abs` | - | `[Num]` | `Num` | Absolute value |
| `Min` | - | `[Num, Num, ...]` | `Num` | Minimum of all arguments |
| `Max` | - | `[Num, Num, ...]` | `Num` | Maximum of all arguments |
| `Floor` | - | `[Num]` | `Num` | Round down to nearest integer |
| `Ceil` | - | `[Num]` | `Num` | Round up to nearest integer |
| `Round` | - | `[Num]` | `Num` | Round to nearest integer |

## Bitwise Operations

| Primitive | Aliases | Signature | Returns | Description |
|-----------|---------|-----------|---------|-------------|
| `BitAnd` | `&` | `[Num, Num]` | `Num` | Bitwise AND of two 32-bit integers |
| `BitOr` | `\|` | `[Num, Num]` | `Num` | Bitwise OR of two 32-bit integers |
| `BitXor` | - | `[Num, Num]` | `Num` | Bitwise XOR of two 32-bit integers |
| `BitNot` | `~` | `[Num]` | `Num` | Bitwise NOT of 32-bit integer |
| `BitShiftLeft` | `<<` | `[Num, Num]` | `Num` | Left shift by specified number of bits |
| `BitShiftRight` | `>>` | `[Num, Num]` | `Num` | Arithmetic right shift (sign-preserving) |
| `BitShiftRightUnsigned` | `>>>` | `[Num, Num]` | `Num` | Logical right shift (zero-fill) |

## String Operations

| Primitive | Signature | Returns | Description |
|-----------|-----------|---------|-------------|
| `Concat` | `[Str\|Num, ...]` | `Str` | Concatenate strings/numbers |
| `ToString` | `[Any]` | `Str` | Convert any value to string (S-expression format for complex expressions) |
| `ToNormalString` | `[Any]` | `Str` | Convert normalized expression to string (returns null for non-normalized expressions) |
| `ToUpper` | `[Str]` | `Str` | Convert to uppercase |
| `ToLower` | `[Str]` | `Str` | Convert to lowercase |
| `Trim` | `[Str]` | `Str` | Remove leading/trailing whitespace |
| `StrLen` | `[Str]` | `Num` | String length |
| `Substring` | `[Str, Num, Num?]` | `Str` | Extract substring (start, optional end) |
| `IndexOf` | `[Str, Str]` | `Num` | Find index of substring (-1 if not found) |
| `Replace` | `[Str, Str, Str]` | `Str` | Replace first occurrence |
| `ReplaceAll` | `[Str, Str, Str]` | `Str` | Replace all occurrences |
| `Split` | `[Str, Str]` | - | Split string (returns null - no list support yet) |
| `SplitToChars` | `[Str]` | `Chars[Str, ...]` | Split string into individual characters |
| `SplitBy` | `[Str, Str]` | `Strings[Str, ...]` | Split string by separator (empty separator splits into chars) |
| `Join` | `[Str, Str\|Num, ...]` | `Str` | Join items with separator (works with rest args) |
| `Escape` | `[Str]` | `Str` | Escape special characters (\\, ", \n, \r, \t, \f) |
| `Unescape` | `[Str]` | `Str` | Unescape escape sequences |

## Comparison Operations

| Primitive | Aliases | Signature | Returns | Description |
|-----------|---------|-----------|---------|-------------|
| `Is` | `==`, `Eq` | `[Any, Any]` | `True\|False` | Structural equality check (compares as-is, deep for calls) |
| `IsNot` | `!=`, `Neq` | `[Any, Any]` | `True\|False` | Structural inequality check |
| `NormalEq` | - | `[Any, Any]` | `True\|False` | Normalized equality (normalizes both args first, then compares) |
| `Are` | - | `[Any, Any, ...]` | `True\|False` | Returns True if ALL items equal the first value |
| `AreNot` | - | `[Any, Any, ...]` | `True\|False` | Returns True if ALL items do NOT equal the first value |
| `AreAny` | - | `[Any, Any, ...]` | `True\|False` | Returns True if ANY item equals the first value |
| `AreAnyNot` | - | `[Any, Any, ...]` | `True\|False` | Returns True if ANY item does NOT equal the first value |
| `IsAny` | - | `[Any, Any, ...]` | `True\|False` | Returns True if exactly ONE item does NOT equal the first value |
| `AreIn` | - | `[Call\|Array, Any, ...]` | `True\|False` | Returns True if ALL remaining args are members of the set (first arg) |
| `Lt` | `<` | `[Num, Num]` | `True\|False` | Less than |
| `Gt` | `>` | `[Num, Num]` | `True\|False` | Greater than |
| `Lte` | `<=` | `[Num, Num]` | `True\|False` | Less than or equal |
| `Gte` | `>=` | `[Num, Num]` | `True\|False` | Greater than or equal |

## Boolean Operations

| Primitive | Signature | Returns | Description |
|-----------|-----------|---------|-------------|
| `And` | `[Bool, Bool, ...]` | `True\|False` | Logical AND (true if all are True) |
| `Or` | `[Bool, Bool, ...]` | `True\|False` | Logical OR (true if any is True) |
| `Not` | `[Bool]` | `True\|False` | Logical NOT |
| `If` | `[Bool, Any, Any]` | `Any` | Conditional expression (returns 2nd arg if True, 3rd arg if False) |

## Type Checking

| Primitive | Signature | Returns | Description |
|-----------|-----------|---------|-------------|
| `IsNum` | `[Any]` | `True\|False` | Check if value is a number |
| `IsStr` | `[Any]` | `True\|False` | Check if value is a string |
| `IsSym` | `[Any]` | `True\|False` | Check if value is a symbol |
| `IsTrue` | `[Any]` | `True\|False` | Check if value is True symbol |
| `IsFalse` | `[Any]` | `True\|False` | Check if value is False symbol |
| `AreNums` | `[Array\|Splice\|...args]` | `True\|False` | Check if all elements are numbers |
| `AreStrings` | `[Array\|Splice\|...args]` | `True\|False` | Check if all elements are strings |
| `AreSyms` | `[Array\|Splice\|...args]` | `True\|False` | Check if all elements are symbols |

## Utilities

| Primitive | Aliases | Signature | Returns | Description |
|-----------|---------|-----------|---------|-------------|
| `FreshId` | - | `[]` | `Str` | Generate unique identifier |
| `Random` | - | `[]\|[Num, Num]` | `Num` | Random number (0-1, or min-max range) |
| `ParseNum` | `ToNumber` | `[Str]` | `Num` | Parse string to number (returns null if invalid) |
| `Debug` | - | `[Any]\|[Str, Any]` | `Any` | Log value to console and pass through (optional label) |
| `CharFromCode` | - | `[Num]` | `Str` | Convert ASCII/Unicode code to character |
| `Sym` | - | `[Str]` | `Sym` | Convert string to symbol (returns null for invalid names) |
| `Str` | - | `[Sym\|Num\|Str]` | `Str` | Convert atom to string (symbols and numbers only, not Call expressions) |
| `Splat` | `...!` | `[...args]` | `Splice` | Create splice object for spreading arguments |
| `Reverse` | - | `[...args]` | `Splice` | Reverse order of arguments (returns Splice) |
| `Serialize` | - | `[Expr]` | `Str` | Convert expression to JSON string |
| `Deserialize` | - | `[Str]` | `Expr` | Parse JSON string back to expression |
| `Length` | - | `[Str]` | `Num` | String length (alias for StrLen) |
| `Slice` | - | `[Str, Num, Num?]` | `Str` | Extract substring (alias for Substring) |
| `Size` | - | `[Any]` | `Num` | Size of expression (1 for atoms, 1 + args.length for calls) |

## Projection Operations

| Primitive | Signature | Returns | Description |
|-----------|-----------|---------|-------------|
| `ProjectToString` | `[UI]`\|`[UI, State]` | `Str` | Render UI node to HTML string (omits event handlers/bindings, optional state) |

## Notes

- **Primitives fold during normalization**: These operations are evaluated automatically when their arguments are fully computed values.
- **Null return = no fold**: When a primitive returns `null`, the expression remains symbolic and is not reduced.
- **Type safety**: Most primitives only fold when given the correct types. Wrong types result in `null` (stays symbolic).
- **Arrays and Splices**: The `AreNums`, `AreStrings`, and `AreSyms` primitives can handle:
  - VarRest bindings that expand to arrays
  - Splice objects from rule substitution
  - Multiple arguments passed directly
- **Boolean values**: Represented as symbols `True` and `False`
- **Escape sequences**: `Escape` and `Unescape` handle: `\"`, `\\`, `\n`, `\r`, `\t`, `\f`

## Examples

```lisp
; Arithmetic
{Add 2 3}              ; → 5
{+ 2 3}                ; → 5
{Pow 2 8}              ; → 256
{Max 3 7 2 9 1}        ; → 9

; Bitwise
{BitAnd 12 10}         ; → 8  (0b1100 & 0b1010 = 0b1000)
{& 12 10}              ; → 8
{BitOr 12 10}          ; → 14 (0b1100 | 0b1010 = 0b1110)
{| 12 10}              ; → 14
{BitXor 12 10}         ; → 6  (0b1100 ^ 0b1010 = 0b0110)
{BitNot 5}             ; → -6 (~5 in 32-bit two's complement)
{~ 5}                  ; → -6
{BitShiftLeft 1 3}     ; → 8  (1 << 3)
{<< 1 3}               ; → 8
{BitShiftRight -8 2}   ; → -2 (-8 >> 2, sign-preserving)
{>> -8 2}              ; → -2
{BitShiftRightUnsigned -8 2}  ; → 1073741822 (-8 >>> 2, zero-fill)
{>>> -8 2}             ; → 1073741822

; Strings
{Concat "Hello" " " "World"}  ; → "Hello World"
{ToUpper "hello"}             ; → "HELLO"
{StrLen "test"}               ; → 4
{SplitToChars "ABC"}          ; → Chars["A", "B", "C"]
{SplitBy "-" "a-b-c"}         ; → Strings["a", "b", "c"]
{Join " " "Hello" "World"}    ; → "Hello World"
{Join ", " "a" "b" "c"}       ; → "a, b, c"

; Comparisons
{Eq 5 5}               ; → True (Eq is alias for Is)
{Is {Add 1 2} 3}       ; → False (structural comparison, different structures)
{NormalEq {Add 1 2} 3} ; → True (normalized equality, both become 3)
{Are 5 5 5 5}          ; → True (all items equal 5)
{AreAny 3 1 2 3 4}     ; → True (at least one item equals 3)
{AreIn {0 1} 1 1}     ; → True (both 1's are in the set {0 1})
{AreIn {a b} a b}      ; → True (both a and b are in the set)
{AreIn {a b} a b c}    ; → False (c is not in the set {a b})
{Lt 3 7}               ; → True
{>= 10 5}              ; → True

; Boolean
{And True True False}  ; → False
{Or False False True}  ; → True
{Not True}             ; → False
{If True "yes" "no"}   ; → "yes"
{If False "yes" "no"}  ; → "no"
{If {Eq 1 1} 42 0}     ; → 42
{If {Lt 5 10} "less" "not less"}  ; → "less"

; Type checking
{IsNum 42}             ; → True
{IsStr "hello"}        ; → True
{AreNums 1 2 3}        ; → True

; Utilities
{FreshId}              ; → "id-12345" (unique)
{Random 1 10}          ; → 7.3 (random between 1-10)
{ParseNum "42"}        ; → 42
{ToNumber "3.14"}      ; → 3.14 (alias for ParseNum)
{Debug "x" {+ 2 3}}    ; Logs "[DEBUG x] 5", returns 5
{CharFromCode 65}      ; → "A"
{Sym "Hello"}          ; → Hello (creates symbol from string)
{Str Hello}            ; → "Hello" (creates string from symbol)
{Str 42}               ; → "42" (creates string from number)
{Length "test"}        ; → 4 (alias for StrLen)
{Slice "hello" 1 4}    ; → "ell" (alias for Substring)
{Reverse "a" "b" "c"}  ; → Splice["c", "b", "a"] (can be splatted)
{Size 42}              ; → 1 (atoms have size 1)
{Size "hello"}         ; → 1 (strings are atoms)
{Size {Add 2 3}}       ; → 3 (head + 2 args = 1 + 2)

; Projection Operations
{ProjectToString {Div :class "card" {H1 "Hello"}}}
; → "<div class=\"card\"><h1>Hello</h1></div>"

{ProjectToString
  {Div {P "Hello, " {Show name}}}
  {State {KV name "Alice"}}}
; → "<div><p>Hello, Alice</p></div>"
```