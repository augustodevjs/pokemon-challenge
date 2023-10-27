namespace Pokemon.Domain.Contracts;

public interface IUnityOfWork
{
    Task<bool> Commit();
}