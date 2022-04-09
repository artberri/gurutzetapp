export const enum EitherType {
  Left = "Left",
  Right = "Right",
}

type Left<L> = { type: EitherType.Left; left: L };
type Right<R> = { type: EitherType.Right; right: R };
type EitherValue<L, R> = Left<L> | Right<R>;

class Either<L, R> {
  public static left<TL, TR>(value: TL): Either<TL, TR> {
    return new Either<TL, TR>({ type: EitherType.Left, left: value });
  }

  public static right<TL, TR>(value: TR): Either<TL, TR> {
    return new Either<TL, TR>({ type: EitherType.Right, right: value });
  }

  protected constructor(protected readonly data: EitherValue<L, R>) {}

  public isLeft(): boolean {
    return this.data.type === EitherType.Left;
  }

  public isRight(): boolean {
    return this.data.type === EitherType.Right;
  }

  public chain<T>(fn: (wrapped: R) => Either<L, T>): Either<L, T> {
    return this.data.type === EitherType.Left
      ? Either.left(this.data.left)
      : fn(this.data.right);
  }

  public chainLeft<T>(fn: (wrapped: L) => Either<T, R>): Either<T, R> {
    return this.data.type === EitherType.Left
      ? fn(this.data.left)
      : Either.right(this.data.right);
  }

  public map<T>(fn: (wrapped: R) => T): Either<L, T> {
    return this.chain((data) => Either.right(fn(data)));
  }

  public mapLeft<T>(fn: (wrapped: L) => T): Either<T, R> {
    return this.chainLeft((data) => Either.left(fn(data)));
  }

  public option(fn: (wrapped: L) => R): R {
    return this.data.type === EitherType.Left
      ? fn(this.data.left)
      : this.data.right;
  }
}

export const left = <R, L = Error>(value: L): Either<L, R> =>
  Either.left(value);

export const right = <R, L = Error>(value: R): Either<L, R> =>
  Either.right(value);

export const fromPredicate =
  <L, R>(predicate: (v: R) => boolean, onFalse: (v: R) => L) =>
  (value: R): Either<L, R> =>
    predicate(value) ? right(value) : left(onFalse(value));

export const isLeft = <L, R>(either: Either<L, R>): boolean => either.isLeft();

export const isRight = <L, R>(either: Either<L, R>): boolean =>
  either.isRight();

export const chain =
  <L, R, T>(fn: (wrapped: R) => Either<L, T>) =>
  (either: Either<L, R>): Either<L, T> =>
    either.chain(fn);

export const chainLeft =
  <L, R, T>(fn: (wrapped: L) => Either<T, R>) =>
  (either: Either<L, R>): Either<T, R> =>
    either.chainLeft(fn);

export const map =
  <L, R, T>(fn: (wrapped: R) => T) =>
  (either: Either<L, R>): Either<L, T> =>
    either.map((v) => fn(v));

export const mapLeft =
  <L, R, T>(fn: (wrapped: L) => T) =>
  (either: Either<L, R>): Either<T, R> =>
    either.mapLeft(fn);

export const option =
  <R, L = Error>(fn: (wrapped: L) => R) =>
  (either: Either<L, R>): R =>
    either.option(fn);

export type { Either };
