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
  }

  private _id: number
  private _lifeStrength: number
  private _damage: number
  private _isHuman: boolean
  private _readyToMovePercent: number

  constructor(id: number, isHuman: boolean, lifeStrength: number, damage: number) {
    this._id = id
    this._isHuman = isHuman
    this._lifeStrength = lifeStrength
    this._damage = damage
    this._readyToMovePercent = 100
  }
}
