use anchor_lang::prelude::*;

declare_id!("2fNDYYpjb7EQRdRfR3FwL1M5sJ95LbBY8TMJDiBrUWXx");

#[program]
pub mod smart_contract {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let park_fund = &mut ctx.accounts.park_fund;
        park_fund.fund = 0.0;
        msg!("User account initialized successfully.");
        Ok(())
    }

    pub fn get_fund(ctx: Context<Deposit>) -> Result<f64> {
        let park_fund = &ctx.accounts.park_fund;
        msg!("Fund balance: {:?}", park_fund.fund);
        Ok(park_fund.fund)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: f64) -> Result<()> {
        let park_fund = &mut ctx.accounts.park_fund;
        msg!("Depositing funds into the account.");
        park_fund.fund += amount;
        msg!("Fund deposited successfully.");
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: f64) -> Result<()> {
        // require!(
        //     ctx.accounts.user.key() == ctx.accounts.park_fund.admin,
        //     ErrorCode::UnauthorizedUser
        // );
        let park_fund = &mut ctx.accounts.park_fund;
        if park_fund.fund < amount {
            return Err(ErrorCode::InsufficientFunds.into());
        }
        park_fund.fund -= amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 200,seeds = [b"PARKIN".as_ref(), user.key().as_ref()],bump)]
    pub park_fund: Account<'info, ParkFund>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct ParkFund {
    pub admin: Pubkey,
    pub fund: f64,
}

/// Context for operations involving funds transfer or modification.
#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub park_fund: Account<'info, ParkFund>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub park_fund: Account<'info, ParkFund>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The requested withdrawal amount exceeds the available funds.")]
    InsufficientFunds,

    #[msg("Transfer of funds failed.")]
    TransferFailed,

    #[msg("The user is not authorized to perform this operation.")]
    UnauthorizedUser,
}
