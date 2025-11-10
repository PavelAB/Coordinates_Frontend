export class User{
    public IdUser: string;
    public FirstName?: string;
    public LastName?: string;
    public NickName?: string;
    public Login: string;
    public Email: string;
    public Avatar?: string;
    public Token?: string;
    public CreatedAt: Date;
    public UpdatedAt?: Date;

    constructor(
        IdUser: string,
        Login: string,
        Email: string,
        CreatedAt: Date,
        FirstName?: string,
        LastName?: string,
        NickName?: string,
        Avatar?: string,
        Token?: string,
        UpdatedAt?: Date
    ) {
        this.IdUser = IdUser
        this.FirstName = FirstName
        this.LastName = LastName
        this.NickName = NickName
        this.Login = Login
        this.Email = Email
        this.Avatar = Avatar
        this.Token = Token
        this.CreatedAt = CreatedAt
        this.UpdatedAt = UpdatedAt
    }
}