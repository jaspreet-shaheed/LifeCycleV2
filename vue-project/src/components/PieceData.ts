export default class PieceData {
  static MaxLifeStrength = 100

  public get id(): number {
    return this._id
  }

  public get isHuman(): boolean {
    return this._isHuman
  }

  public get lifeStrength(): number {
    return this._lifeStrength
  }

  public get damage(): number {
    return this._damage
  }

  public get readyToMovePercent(): number {
    return this._readyToMovePercent
  }

  public readyToMove(): boolean {
    return this._readyToMovePercent === 100
  }

  public move(): void {
    this._readyToMovePercent = 0
  }

  public tick(): void {
    if (this._readyToMovePercent < 100) {
      this._readyToMovePercent++
    }
    if (this._goingUp) {
      if (this._lifeStrength < 100) {
        this._lifeStrength++
      } else {
        this._goingUp = false
      }
    } else {
      if (this._lifeStrength > 0) {
        this._lifeStrength--
      } else {
        this._goingUp = true
      }
    }
  }

  private _id: number
  private _lifeStrength: number
  private _damage: number
  private _isHuman: boolean
  private _readyToMovePercent: number
  private _goingUp: boolean

  constructor(id: number, isHuman: boolean, lifeStrength: number, damage: number) {
    this._id = id
    this._isHuman = isHuman
    this._lifeStrength = lifeStrength
    this._damage = damage
    this._readyToMovePercent = 100
    this._goingUp = true
  }
}
